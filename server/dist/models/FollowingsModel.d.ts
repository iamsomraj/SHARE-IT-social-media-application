import { Model, RelationMappings } from 'objection';
import { Following } from '../types';
declare class FollowingsModel extends Model implements Following {
    id: number;
    follower_id: number;
    followed_id: number;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
    static get tableName(): string;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get idColumn(): string;
    static get followerIdColumn(): string;
    static get followedIdColumn(): string;
    static get createdAtColumn(): string;
    static get updatedAtColumn(): string;
    static get createdByColumn(): string;
    static get updatedByColumn(): string;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            follower_id: {
                type: string;
            };
            followed_id: {
                type: string;
            };
            created_at: {
                type: string;
            };
            updated_at: {
                type: string;
            };
            created_by: {
                type: string;
            };
            updated_by: {
                type: string;
            };
        };
    };
    static get relationMappings(): RelationMappings;
}
export default FollowingsModel;
//# sourceMappingURL=FollowingsModel.d.ts.map