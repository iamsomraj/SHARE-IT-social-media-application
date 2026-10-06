import { Model, type QueryBuilder, type RelationMappings } from 'objection';
import { randomUUID } from 'node:crypto';
import type { Post } from '../types';
import PersonsModel from './PersonsModel';
import PostLikesModel from './PostLikesModel';
import PostStatsModel from './PostStatsModel';
import StoriesModel from './StoriesModel';

class PostsModel extends Model implements Post {
  id!: number;
  uuid!: string;
  content!: string;
  created_at!: string;
  updated_at!: string;
  created_by!: number;
  updated_by!: number;
  is_deleted!: boolean;

  static override get tableName(): string {
    return 'public.posts';
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

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'created_by'],
      properties: {
        id: { type: 'integer' },
        uuid: { type: 'string' },
        content: { type: 'string', minLength: 1, maxLength: 500 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        created_by: { type: 'integer' },
        updated_by: { type: 'integer' },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  static override get modifiers() {
    return {
      orderByLatest(builder: QueryBuilder<PostsModel>) {
        builder.orderBy([
          { column: 'created_at', order: 'desc', nulls: 'last' },
          { column: 'updated_at', order: 'desc', nulls: 'last' },
        ]);
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      post_stats: {
        relation: Model.HasOneRelation,
        modelClass: PostStatsModel,
        join: {
          from: 'public.posts.id',
          to: 'public.post_stats.post_id',
        },
      },
      post_likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: 'public.posts.id',
          to: 'public.post_likes.post_id',
        },
      },
      post_stories: {
        relation: Model.HasManyRelation,
        modelClass: StoriesModel,
        join: {
          from: 'public.posts.id',
          to: 'public.stories.post_id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.posts.created_by',
          to: 'public.persons.id',
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.posts.updated_by',
          to: 'public.persons.id',
        },
      },
    };
  }

  /** Fetches a post with likes, stories, stats and creator. */
  static async getPostDetails(uuid: string): Promise<PostsModel | undefined> {
    return PostsModel.query()
      .findOne({ uuid })
      .withGraphFetched(
        '[post_likes(orderByLatest).creator(defaultSelects), post_stories(orderByLatest).creator(defaultSelects), post_stats, creator(defaultSelects)]',
      );
  }
}

export default PostsModel;
