import { Model, QueryBuilder, RelationMappings } from 'objection';
import { randomUUID } from 'crypto';
import type { Person, PersonWithStats } from '@/types';

export class PersonsModel extends Model implements Person {
  id!: number;
  uuid!: string;
  name!: string;
  email!: string;
  password!: string;
  created_at!: string;
  updated_at!: string;
  is_deleted!: boolean;

  // Relations
  person_followers?: any[];
  person_followings?: any[];
  person_posts?: any[];
  person_stories?: any[];
  person_post_likes?: any[];
  person_stats?: any;

  static override get tableName(): string {
    return 'public.persons';
  }

  override $beforeInsert(): void {
    this.created_at = new Date().toISOString();
    this.uuid = randomUUID();
  }

  override $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }

  static override get idColumn(): string {
    return 'id';
  }

  static get nameColumn(): string {
    return 'name';
  }

  static get emailColumn(): string {
    return 'email';
  }

  static get passwordColumn(): string {
    return 'password';
  }

  static get createdAtColumn(): string {
    return 'created_at';
  }

  static get updatedAtColumn(): string {
    return 'updated_at';
  }

  static get isDeletedColumn(): string {
    return 'is_deleted';
  }

  static override get jsonSchema(): object {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        uuid: { type: 'string' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', minLength: 5, maxLength: 50 },
        password: { type: 'string', minLength: 4, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    // Import other models dynamically to avoid circular dependencies
    const FollowingsModel = require('./FollowingsModel').default;
    const PostsModel = require('./PostsModel').default;
    const PostLikesModel = require('./PostLikesModel').default;
    const PersonStatsModel = require('./PersonStatsModel').default;
    const StoriesModel = require('./StoriesModel').default;

    return {
      person_followers: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.followings.follower_id',
        },
      },
      person_followings: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.followings.followed_id',
        },
      },
      person_posts: {
        relation: Model.HasManyRelation,
        modelClass: PostsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.posts.created_by',
        },
      },
      person_stories: {
        relation: Model.HasManyRelation,
        modelClass: StoriesModel,
        join: {
          from: 'public.persons.id',
          to: 'public.stories.person_id',
        },
      },
      person_post_likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: 'public.persons.id',
          to: 'public.post_likes.created_by',
        },
      },
      person_stats: {
        relation: Model.HasOneRelation,
        modelClass: PersonStatsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.person_stats.person_id',
        },
      },
    };
  }

  static override get modifiers(): Record<
    string,
    (builder: QueryBuilder<PersonsModel>) => void
  > {
    return {
      defaultSelects(builder: QueryBuilder<PersonsModel>) {
        builder.select(
          'id',
          'uuid',
          'name',
          'email',
          'created_at',
          'updated_at',
        );
      },
      orderByLatest(builder: QueryBuilder<PersonsModel>) {
        builder.orderBy([
          { column: 'created_at', order: 'desc', nulls: 'last' },
          { column: 'updated_at', order: 'desc', nulls: 'last' },
        ]);
      },
    };
  }

  /**
   * @description fetches details of a person
   * @param email - person's email
   */
  static async getPersonDetailsByEmail(
    email: string,
  ): Promise<PersonWithStats | undefined> {
    const personRecord = await PersonsModel.query()
      .findOne({ email })
      .withGraphFetched(
        '[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]',
      );

    if (personRecord) {
      // Remove password from response
      const { password, ...personWithoutPassword } = personRecord;
      return personWithoutPassword as PersonWithStats;
    }

    return undefined;
  }

  /**
   * @description checks if a person exists with the given email
   * @param email - person's email
   */
  static async checkIfPersonExistsByEmail(
    email: string,
  ): Promise<PersonsModel | undefined> {
    return await PersonsModel.query().findOne({
      email,
      is_deleted: false,
    });
  }

  /**
   * @description checks if a person exists with the given id
   * @param id - person's id
   */
  static async checkIfPersonExistsById(
    id: number,
  ): Promise<PersonsModel | undefined> {
    return await PersonsModel.query().findOne({
      id,
      is_deleted: false,
    });
  }

  /**
   * @description checks if a person exists with the given uuid
   * @param uuid - person's uuid
   */
  static async checkIfPersonExistsByUUID(
    uuid: string,
  ): Promise<PersonsModel | undefined> {
    return await PersonsModel.query().findOne({
      uuid,
      is_deleted: false,
    });
  }

  /**
   * @description fetches details of a person by UUID
   * @param uuid - person's uuid
   */
  static async getPersonDetailsByUUID(
    uuid: string,
  ): Promise<PersonWithStats | undefined> {
    const personRecord = await PersonsModel.query()
      .findOne({ uuid, is_deleted: false })
      .withGraphFetched(
        '[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]',
      );

    if (personRecord) {
      // Remove password from response
      const { password, ...personWithoutPassword } = personRecord;
      return personWithoutPassword as PersonWithStats;
    }

    return undefined;
  }
}

export default PersonsModel;
