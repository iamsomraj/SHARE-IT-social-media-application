import PersonsModel from '@/models/PersonsModel';
import PersonStatsModel from '@/models/PersonStatsModel';
import FollowingsModel from '@/models/FollowingsModel';
import { generateToken, validateHash, hash } from '@/utils/helpers';
import RootService from '@/services/Root/RootService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_ERROR_MESSAGES } from '@/utils/constants/messages';
import { Person, AuthResponse } from '@/types';
import {
  validateWithZod,
  ZodLoginSchema,
  ZodRegisterSchema,
  LoginInput,
  RegisterInput,
} from '@/schemas';

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL PERSON RELATED CONTROLLERS
 */
class PersonService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description Validates login input using Zod
   * @param email - person's email
   * @param password - person's password
   */
  private validateLoginInput(email: string, password: string): LoginInput {
    return validateWithZod(ZodLoginSchema, { email, password });
  }

  /**
   * @description Validates registration input using Zod
   * @param name - person's name
   * @param email - person's email
   * @param password - person's password
   */
  private validateRegisterInput(
    name: string,
    email: string,
    password: string,
  ): RegisterInput {
    return validateWithZod(ZodRegisterSchema, { name, email, password });
  }

  /**
   * @description LOGS IN A PERSON
   * @param email - person's email
   * @param password - person's password
   * @route POST /api/v1/persons/auth
   * @access public
   */
  async loginPerson(email: string, password: string): Promise<AuthResponse> {
    // Validate input using Zod
    const validatedInput = this.validateLoginInput(email, password);

    /* BEGIN: DATABASE VALIDATIONS */
    const doesPersonExist = await PersonsModel.checkIfPersonExistsByEmail(
      validatedInput.email,
    );

    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (!doesPersonExist) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }
    /* CHECKING IF PASSWORD MATCHES OR NOT */
    if (!validateHash(validatedInput.password, doesPersonExist.password)) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS,
      );
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: PERSON DETAILS FETCHING */
    const personRecord = await PersonsModel.getPersonDetailsByEmail(
      validatedInput.email,
    );
    /* END: PERSON DETAILS FETCHING */

    if (!personRecord) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.FETCH_USER_DATA_FAILURE,
      );
    }

    /* BEGIN: TOKEN GENERATION */
    const token = generateToken(personRecord.id);
    /* END: TOKEN GENERATION */

    const result: AuthResponse = {
      ...personRecord,
      token,
    };

    return result;
  }

  /**
   * @description REGISTERS A PERSON
   * @param name - person's name
   * @param email - person's email
   * @param password - person's password
   * @route POST /api/v1/persons/
   * @access public
   */
  async registerPerson(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    // Validate input using Zod
    const validatedInput = this.validateRegisterInput(name, email, password);

    /* BEGIN: DATABASE VALIDATIONS */
    const doesUserExist = await PersonsModel.checkIfPersonExistsByEmail(
      validatedInput.email,
    );

    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (doesUserExist) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.USER_ALREADY_EXISTS,
      );
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: PERSON DETAILS INSERTION */
    const insertedPerson = await PersonsModel.query().insertAndFetch({
      name: validatedInput.name,
      email: validatedInput.email,
      password: hash(validatedInput.password),
      is_deleted: false,
    });
    if (!insertedPerson) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE,
      );
    }
    /* END: PERSON DETAILS INSERTION */

    /* BEGIN: INSERT PERSON STATS RECORD */
    const insertedStatRecord = await PersonStatsModel.query().insert({
      person_id: insertedPerson.id,
      post_count: 0,
      following_count: 0,
      follower_count: 0,
    });
    if (!insertedStatRecord) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE,
      );
    }
    /* END: INSERT PERSON STATS RECORD */

    /* BEGIN: PERSON DETAILS FETCHING */
    const registeredPerson = await PersonsModel.getPersonDetailsByEmail(email);
    if (!registeredPerson) {
      this.raiseError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE,
      );
    }
    /* END: PERSON DETAILS FETCHING */

    /* BEGIN: TOKEN GENERATION */
    const token = generateToken(registeredPerson.id);
    /* END: TOKEN GENERATION */

    const result: AuthResponse = {
      ...registeredPerson,
      token,
    };

    return result;
  }

  /**
   * @description GET ALL PEOPLE WITH PAGINATION
   * @param user - current user
   * @param page - page number
   * @param limit - items per page
   * @route GET /api/v1/persons/people
   * @access private
   */
  async getPeople(
    user: Person,
    page: number = 1,
    limit: number = 10,
  ): Promise<PersonsModel[]> {
    const offset = (page - 1) * limit;

    const people = await PersonsModel.query()
      .where('id', '!=', user.id)
      .where('is_deleted', false)
      .modify('defaultSelects')
      .withGraphFetched('person_stats')
      .limit(limit)
      .offset(offset)
      .modify('orderByLatest');

    return people;
  }

  /**
   * @description GET CURRENT USER DATA
   * @param user - current user
   * @route GET /api/v1/persons/
   * @access private
   */
  async getUserData(user: Person): Promise<PersonsModel> {
    const userData = await PersonsModel.query()
      .findById(user.id)
      .modify('defaultSelects')
      .withGraphFetched('[person_stats, person_followers, person_following]');

    if (!userData) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    return userData;
  }

  /**
   * @description GET PERSON PROFILE BY UUID
   * @param uuid - person's uuid
   * @route GET /api/v1/persons/:uuid
   * @access private
   */
  async getPersonProfile(uuid: string): Promise<PersonsModel> {
    const personProfile = await PersonsModel.query()
      .findOne({ uuid })
      .where('is_deleted', false)
      .modify('defaultSelects')
      .withGraphFetched('[person_stats, person_followers, person_following]');

    if (!personProfile) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    return personProfile;
  }

  /**
   * @description FOLLOW A PERSON
   * @param user - current user
   * @param uuid - person's uuid to follow
   * @route POST /api/v1/persons/follow/:uuid
   * @access private
   */
  async followPerson(user: Person, uuid: string): Promise<void> {
    /* BEGIN: VALIDATIONS */
    if (!uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.PROVIDE_PERSON_UUID,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    const personToFollow = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!personToFollow) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    if (personToFollow.id === user.id) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.CANNOT_FOLLOW_YOURSELF,
      );
    }

    const existingFollow = await FollowingsModel.query().findOne({
      follower_id: user.id,
      followed_id: personToFollow.id,
    });

    if (existingFollow) {
      this.raiseError(
        HTTP_CODES.CONFLICT,
        PERSON_ERROR_MESSAGES.ALREADY_FOLLOWING,
      );
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: CREATE FOLLOW RELATIONSHIP */
    await FollowingsModel.query().insert({
      follower_id: user.id,
      followed_id: personToFollow.id,
      created_by: user.id,
      updated_by: user.id,
    });
    /* END: CREATE FOLLOW RELATIONSHIP */
  }

  /**
   * @description UNFOLLOW A PERSON
   * @param user - current user
   * @param uuid - person's uuid to unfollow
   * @route POST /api/v1/persons/unfollow/:uuid
   * @access private
   */
  async unfollowPerson(user: Person, uuid: string): Promise<void> {
    /* BEGIN: VALIDATIONS */
    if (!uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.PROVIDE_PERSON_UUID,
      );
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    const personToUnfollow = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!personToUnfollow) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    const existingFollow = await FollowingsModel.query().findOne({
      follower_id: user.id,
      followed_id: personToUnfollow.id,
    });

    if (!existingFollow) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.NOT_FOLLOWING,
      );
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: REMOVE FOLLOW RELATIONSHIP */
    await FollowingsModel.query().delete().where({
      follower_id: user.id,
      followed_id: personToUnfollow.id,
    });
    /* END: REMOVE FOLLOW RELATIONSHIP */
  }

  /**
   * @description SEARCH PEOPLE BY NAME OR EMAIL
   * @param user - current user
   * @param searchQuery - search query
   * @route POST /api/v1/persons/search/
   * @access private
   */
  async search(user: Person, searchQuery: string): Promise<PersonsModel[]> {
    if (!searchQuery || searchQuery.trim().length === 0) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        PERSON_ERROR_MESSAGES.PROVIDE_SEARCH_QUERY,
      );
    }

    const searchResults = await PersonsModel.query()
      .where('id', '!=', user.id)
      .where('is_deleted', false)
      .where(builder => {
        builder
          .where('name', 'ilike', `%${searchQuery}%`)
          .orWhere('email', 'ilike', `%${searchQuery}%`);
      })
      .modify('defaultSelects')
      .withGraphFetched('person_stats')
      .limit(20)
      .modify('orderByLatest');

    return searchResults;
  }
}

export default PersonService;
