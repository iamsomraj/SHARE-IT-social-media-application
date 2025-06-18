import { Model, RelationMappings } from 'objection';
import { Following } from '@/types';
import PersonsModel from '@/models/PersonsModel';

class FollowingsModel extends Model implements Following {
  id!: number;
  follower_id!: number;
  followed_id!: number;
  created_at!: string;
  updated_at!: string;
  created_by!: number;
  updated_by!: number;

  static override get tableName(): string {
    return 'public.followings';
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

  static get followerIdColumn(): string {
    return 'follower_id';
  }

  static get followedIdColumn(): string {
    return 'followed_id';
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
      required: ['follower_id', 'followed_id'],
      properties: {
        id: { type: 'integer' },
        follower_id: { type: 'integer' },
        followed_id: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        created_by: { type: 'integer' },
        updated_by: { type: 'integer' },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      followed_from: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.followings.followed_id',
          to: 'public.persons.id',
        },
      },
      followed_to: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.followings.follower_id',
          to: 'public.persons.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.followings.created_by',
          to: 'public.persons.id',
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.followings.updated_by',
          to: 'public.persons.id',
        },
      },
    };
  }
}

export default FollowingsModel;
