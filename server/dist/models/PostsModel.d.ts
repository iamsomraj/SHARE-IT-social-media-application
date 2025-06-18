import { Model, RelationMappings, QueryBuilder } from 'objection';
import { Post } from '@/types';
declare class PostsModel extends Model implements Post {
    id: number;
    uuid: string;
    content: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
    is_deleted: boolean;
    static get tableName(): string;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get idColumn(): string;
    static get contentColumn(): string;
    static get createdAtColumn(): string;
    static get updatedAtColumn(): string;
    static get createdByColumn(): string;
    static get updatedByColumn(): string;
    static get isDeletedColumn(): string;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            uuid: {
                type: string;
            };
            content: {
                type: string;
                minLength: number;
                maxLength: number;
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
            is_deleted: {
                type: string;
            };
        };
    };
    static get modifiers(): {
        orderByLatest(builder: QueryBuilder<PostsModel>): void;
    };
    static get relationMappings(): RelationMappings;
    static getPostDetails(uuid: string): Promise<PostsModel | undefined>;
}
export default PostsModel;
//# sourceMappingURL=PostsModel.d.ts.map