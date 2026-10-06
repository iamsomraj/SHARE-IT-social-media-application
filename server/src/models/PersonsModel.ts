import { Model, type QueryBuilder, type RelationMappings } from 'objection';
import { randomUUID } from 'node:crypto';
import type { Person, PublicPerson } from '../types';
import FollowingsModel from './FollowingsModel';
import PersonStatsModel from './PersonStatsModel';
import PostLikesModel from './PostLikesModel';
import PostsModel from './PostsModel';
import StoriesModel from './StoriesModel';

const DETAILS_GRAPH =
  '[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]';

export class PersonsModel extends Model implements Person {
  id!: number;
  uuid!: string;
  name!: string;
  email!: string;
  password!: string;
  created_at!: string;
  updated_at!: string;
  is_deleted!: boolean;

  person_followers?: FollowingsModel[];
  person_followings?: FollowingsModel[];
  person_posts?: PostsModel[];
  person_stories?: StoriesModel[];
  person_post_likes?: PostLikesModel[];
  person_stats?: PersonStatsModel;

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

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        uuid: { type: 'string' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', minLength: 5, maxLength: 255 },
        password: { type: 'string', minLength: 4, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  // Relation getters are evaluated lazily, so circular model imports are safe.
  static override get relationMappings(): RelationMappings {
    return {
      // NOTE: naming is historical and the client relies on it:
      // `person_followers` are rows where this person is the follower.
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

  static override get modifiers() {
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

  /** Never serialize the password hash. */
  override $formatJson(json: Record<string, unknown>) {
    const { password: _password, ...rest } = super.$formatJson(json);
    return rest;
  }

  /** Fetches a person with their relations (password excluded). */
  static async getPersonDetailsByEmail(
    email: string,
  ): Promise<PublicPerson | undefined> {
    const person = await PersonsModel.query()
      .findOne({ email })
      .withGraphFetched(DETAILS_GRAPH);
    return person?.toJSON() as PublicPerson | undefined;
  }

  static async checkIfPersonExistsByEmail(
    email: string,
  ): Promise<PersonsModel | undefined> {
    return PersonsModel.query().findOne({ email, is_deleted: false });
  }

  static async checkIfPersonExistsByUUID(
    uuid: string,
  ): Promise<PersonsModel | undefined> {
    return PersonsModel.query().findOne({ uuid, is_deleted: false });
  }
}

export default PersonsModel;
