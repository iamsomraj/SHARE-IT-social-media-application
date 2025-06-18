import { Model, RelationMappings } from 'objection';
import { PersonStats } from '../types';
declare class PersonStatsModel extends Model implements PersonStats {
    id: number;
    person_id: number;
    post_count: number;
    follower_count: number;
    following_count: number;
    created_at: string;
    updated_at: string;
    static get tableName(): string;
    static get idColumn(): string;
    static get personIdColumn(): string;
    static get postCountColumn(): string;
    static get followerCountColumn(): string;
    static get followingCountColumn(): string;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            person_id: {
                type: string;
            };
            post_count: {
                type: string;
            };
            follower_count: {
                type: string;
            };
            following_count: {
                type: string;
            };
        };
    };
    static get relationMappings(): RelationMappings;
}
export default PersonStatsModel;
//# sourceMappingURL=PersonStatsModel.d.ts.map