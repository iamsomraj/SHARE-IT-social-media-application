import { Model, RelationMappings } from 'objection';
import { PostStats } from '@/types';

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

  static get postIdColumn(): string {
    return 'post_id';
  }

  static get likeCountColumn(): string {
    return 'like_count';
  }

  static get commentCountColumn(): string {
    return 'comment_count';
  }

  static get storyCountColumn(): string {
    return 'story_count';
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
    // TODO: Import PostsModel when circular dependency is resolved
    const PostsModel = require('./PostsModel').default;
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
