import { Model, type RelationMappings } from 'objection';
import type { PersonStats } from '../types';
import PersonsModel from './PersonsModel';

class PersonStatsModel extends Model implements PersonStats {
  id!: number;
  person_id!: number;
  post_count!: number;
  follower_count!: number;
  following_count!: number;
  created_at!: string;
  updated_at!: string;

  static override get tableName(): string {
    return 'public.person_stats';
  }

  static override get idColumn(): string {
    return 'id';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['person_id'],
      properties: {
        id: { type: 'integer' },
        person_id: { type: 'integer' },
        post_count: { type: 'integer' },
        follower_count: { type: 'integer' },
        following_count: { type: 'integer' },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.person_stats.person_id',
          to: 'public.persons.id',
        },
      },
    };
  }
}

export default PersonStatsModel;
