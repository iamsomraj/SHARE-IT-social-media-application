import { Model, RelationMappings, QueryBuilder } from 'objection';
import { PostStory } from '@/types';
import PostsModel from '@/models/PostsModel';
import PersonsModel from '@/models/PersonsModel';

class StoriesModel extends Model implements PostStory {
  id!: number;
  post_id!: number;
  person_id!: number;
  created_at!: string;
  updated_at!: string;

  static override get tableName(): string {
    return 'public.stories';
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

  static get personIdColumn(): string {
    return 'person_id';
  }

  static get createdAtColumn(): string {
    return 'created_at';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'person_id'],
      properties: {
        id: { type: 'integer' },
        post_id: { type: 'integer' },
        person_id: { type: 'integer' },
        created_at: { type: 'string' },
      },
    };
  }

  static override get modifiers() {
    return {
      orderByLatest(builder: QueryBuilder<StoriesModel>) {
        builder.orderBy([
          { column: 'created_at', order: 'desc', nulls: 'last' },
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
          from: 'public.stories.post_id',
          to: 'public.posts.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.stories.person_id',
          to: 'public.persons.id',
        },
      },
    };
  }
}

export default StoriesModel;
