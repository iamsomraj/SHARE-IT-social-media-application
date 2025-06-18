import { Model, RelationMappings, QueryBuilder } from 'objection';
import { PostLikeModel } from '@/types';
import PostsModel from '@/models/PostsModel';
import PersonsModel from '@/models/PersonsModel';

class PostLikesModel extends Model implements PostLikeModel {
  id!: number;
  post_id!: number;
  created_at!: string;
  updated_at!: string;
  created_by!: number;
  updated_by!: number;

  static override get tableName(): string {
    return 'public.post_likes';
  }

  override $beforeInsert(): void {
    this.created_at = new Date().toISOString();
  }

  override $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }

  static override get idColumn(): string {
    return 'id';
  }

  static get postIdColumn(): string {
    return 'post_id';
  }

  static get createdAtColumn(): string {
    return 'created_at';
  }

  static get updatedAtColumn(): string {
    return 'updated_at';
  }

  static get createdByColumn(): string {
    return 'created_by';
  }

  static get updatedByColumn(): string {
    return 'updated_by';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'created_by'],
      properties: {
        id: { type: 'integer' },
        post_id: { type: 'integer' },
        created_by: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        updated_by: { type: 'integer' },
      },
    };
  }

  static override get modifiers() {
    return {
      orderByLatest(builder: QueryBuilder<PostLikesModel>) {
        builder.orderBy([
          { column: 'created_at', order: 'desc', nulls: 'last' },
          { column: 'updated_at', order: 'desc', nulls: 'last' },
        ]);
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: 'public.post_likes.post_id',
          to: 'public.posts.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.post_likes.created_by',
          to: 'public.persons.id',
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.post_likes.updated_by',
          to: 'public.persons.id',
        },
      },
    };
  }
}

export default PostLikesModel;
