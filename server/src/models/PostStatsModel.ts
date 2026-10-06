import { Model, type RelationMappings } from 'objection';
import type { PostStats } from '../types';
import PostsModel from './PostsModel';

class PostStatsModel extends Model implements PostStats {
  id!: number;
  post_id!: number;
  like_count!: number;
  comment_count!: number;
  story_count!: number;
  created_at!: string;
  updated_at!: string;

  static override get tableName(): string {
    return 'public.post_stats';
  }

  static override get idColumn(): string {
    return 'id';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id'],
      properties: {
        id: { type: 'integer' },
        post_id: { type: 'integer' },
        comment_count: { type: 'integer' },
        like_count: { type: 'integer' },
        story_count: { type: 'integer' },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: 'public.post_stats.post_id',
          to: 'public.posts.id',
        },
      },
    };
  }
}

export default PostStatsModel;
