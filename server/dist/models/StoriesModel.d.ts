import { Model, RelationMappings, QueryBuilder } from 'objection';
import { PostStory } from '../types';
declare class StoriesModel extends Model implements PostStory {
    id: number;
    post_id: number;
    person_id: number;
    created_at: string;
    updated_at: string;
    static get tableName(): string;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get idColumn(): string;
    static get postIdColumn(): string;
    static get personIdColumn(): string;
    static get createdAtColumn(): string;
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
            person_id: {
                type: string;
            };
            created_at: {
                type: string;
            };
        };
    };
    static get modifiers(): {
        orderByLatest(builder: QueryBuilder<StoriesModel>): void;
    };
    static get relationMappings(): RelationMappings;
}
export default StoriesModel;
//# sourceMappingURL=StoriesModel.d.ts.map