import type { Knex } from 'knex';
import FollowingsModel from '../../models/FollowingsModel';
import PersonsModel from '../../models/PersonsModel';
import PersonStatsModel from '../../models/PersonStatsModel';
import type { AuthResponse, AuthUser, PublicPerson } from '../../types';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import { PERSON_ERROR_MESSAGES } from '../../utils/constants/messages';
import { HttpError } from '../../utils/errors';
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from '../../utils/helpers';

const SELF_GRAPH = '[person_stats, person_followers, person_followings]';
const SEARCH_LIMIT = 20;

const notFound = (): HttpError =>
  new HttpError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.USER_NOT_FOUND);

/** Escapes `%`, `_` and `\` so user input is matched literally by ILIKE. */
const escapeLike = (value: string): string => value.replace(/[\\%_]/g, '\\$&');

/**
 * Handles all person-related business logic.
 */
class PersonService {
  /**
   * @route POST /api/v1/persons/auth
   */
  async loginPerson(email: string, password: string): Promise<AuthResponse> {
    const person = await PersonsModel.checkIfPersonExistsByEmail(email);
    if (!person) {
      throw notFound();
    }

    if (!(await verifyPassword(password, person.password))) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS,
      );
    }

    return this.buildAuthResponse(email);
  }

  /**
   * @route POST /api/v1/persons/
   */
  async registerPerson(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    if (await PersonsModel.checkIfPersonExistsByEmail(email)) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.USER_ALREADY_EXISTS,
      );
    }

    const hashedPassword = await hashPassword(password);

    await PersonsModel.transaction(async trx => {
      const person = await PersonsModel.query(trx).insertAndFetch({
        name,
        email,
        password: hashedPassword,
        is_deleted: false,
      });

      await PersonStatsModel.query(trx).insert({
        person_id: person.id,
        post_count: 0,
        following_count: 0,
        follower_count: 0,
      });
    });

    return this.buildAuthResponse(email);
  }

  /**
   * @route GET /api/v1/persons/people
   */
  async getPeople(
    user: AuthUser,
    page: number,
    limit: number,
  ): Promise<PersonsModel[]> {
    return PersonsModel.query()
      .where('id', '!=', user.id)
      .where('is_deleted', false)
      .modify('defaultSelects')
      .withGraphFetched('person_stats')
      .limit(limit)
      .offset((page - 1) * limit)
      .modify('orderByLatest');
  }

  /**
   * @route GET /api/v1/persons/
   */
  async getUserData(user: AuthUser): Promise<PersonsModel> {
    return this.getSelfDetails(user.id);
  }

  /**
   * @route GET /api/v1/persons/:uuid
   */
  async getPersonProfile(uuid: string): Promise<PersonsModel> {
    const profile = await PersonsModel.query()
      .findOne({ uuid, is_deleted: false })
      .select(
        'id',
        'uuid',
        'name',
        'email',
        'created_at',
        'updated_at',
        'is_deleted',
      )
      .withGraphFetched(
        '[person_stats, person_followers, person_followings, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]',
      );

    if (!profile) {
      throw notFound();
    }
    return profile;
  }

  /**
   * @route POST /api/v1/persons/follow/:uuid
   */
  async followPerson(user: AuthUser, uuid: string): Promise<PersonsModel> {
    const target = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!target) {
      throw notFound();
    }
    if (target.id === user.id) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.CANNOT_FOLLOW_YOURSELF,
      );
    }

    const existing = await FollowingsModel.query().findOne({
      follower_id: user.id,
      followed_id: target.id,
    });
    if (existing) {
      throw new HttpError(
        HTTP_CODES.CONFLICT,
        PERSON_ERROR_MESSAGES.ALREADY_FOLLOWING,
      );
    }

    await FollowingsModel.transaction(async trx => {
      await FollowingsModel.query(trx).insert({
        follower_id: user.id,
        followed_id: target.id,
        created_by: user.id,
        updated_by: user.id,
      });
      await this.refreshPersonStats(target.id, trx);
      await this.refreshPersonStats(user.id, trx);
    });

    return this.getSelfDetails(user.id);
  }

  /**
   * @route POST /api/v1/persons/unfollow/:uuid
   */
  async unfollowPerson(user: AuthUser, uuid: string): Promise<PersonsModel> {
    const target = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!target) {
      throw notFound();
    }

    const existing = await FollowingsModel.query().findOne({
      follower_id: user.id,
      followed_id: target.id,
    });
    if (!existing) {
      throw new HttpError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.NOT_FOLLOWING,
      );
    }

    await FollowingsModel.transaction(async trx => {
      await FollowingsModel.query(trx)
        .delete()
        .where({ follower_id: user.id, followed_id: target.id });
      await this.refreshPersonStats(target.id, trx);
      await this.refreshPersonStats(user.id, trx);
    });

    return this.getSelfDetails(user.id);
  }

  /**
   * @route POST /api/v1/persons/search
   */
  async search(user: AuthUser, searchQuery: string): Promise<PersonsModel[]> {
    const pattern = `%${escapeLike(searchQuery)}%`;

    return PersonsModel.query()
      .where('id', '!=', user.id)
      .where('is_deleted', false)
      .where(builder => {
        builder
          .where('name', 'ilike', pattern)
          .orWhere('email', 'ilike', pattern);
      })
      .modify('defaultSelects')
      .withGraphFetched('person_stats')
      .limit(SEARCH_LIMIT)
      .modify('orderByLatest');
  }

  private async buildAuthResponse(email: string): Promise<AuthResponse> {
    const person: PublicPerson | undefined =
      await PersonsModel.getPersonDetailsByEmail(email);
    if (!person) {
      throw new HttpError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.FETCH_USER_DATA_FAILURE,
      );
    }
    return { ...person, token: generateToken(person.id) };
  }

  private async getSelfDetails(personId: number): Promise<PersonsModel> {
    const person = await PersonsModel.query()
      .findById(personId)
      .modify('defaultSelects')
      .withGraphFetched(SELF_GRAPH);

    if (!person) {
      throw notFound();
    }
    return person;
  }

  /**
   * Recomputes follower/following/post counters from source tables
   * in a single upsert (one round trip per person).
   */
  private async refreshPersonStats(
    personId: number,
    trx: Knex.Transaction,
  ): Promise<void> {
    await trx.raw(
      `
      INSERT INTO person_stats (person_id, follower_count, following_count, post_count)
      SELECT :personId,
        (SELECT count(*) FROM followings WHERE followed_id = :personId),
        (SELECT count(*) FROM followings WHERE follower_id = :personId),
        (SELECT count(*) FROM posts WHERE created_by = :personId AND is_deleted = false)
      ON CONFLICT (person_id) DO UPDATE SET
        follower_count = EXCLUDED.follower_count,
        following_count = EXCLUDED.following_count,
        post_count = EXCLUDED.post_count
      `,
      { personId },
    );
  }
}

export default new PersonService();
