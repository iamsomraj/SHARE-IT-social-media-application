import { Model, RelationMappings, QueryBuilder } from 'objection';
import { PostLikeModel } from '@/types';
declare class PostLikesModel extends Model implements PostLikeModel {
    id: number;
    post_id: number;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
    static get tableName(): string;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get idColumn(): string;
    static get postIdColumn(): string;
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
            post_id: {
                type: string;
            };
            created_by: {
                type: string;
            };
            created_at: {
                type: string;
            };
            updated_at: {
                type: string;
            };
            updated_by: {
                type: string;
            };
        };
    };
    static get modifiers(): {
        orderByLatest(builder: QueryBuilder<PostLikesModel>): void;
    };
    static get relationMappings(): RelationMappings;
}
export default PostLikesModel;
//# sourceMappingURL=PostLikesModel.d.ts.map