import { Model, QueryBuilder, RelationMappings } from 'objection';
import type { Person, PersonWithStats } from '@/types';
export declare class PersonsModel extends Model implements Person {
    id: number;
    uuid: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    person_followers?: any[];
    person_followings?: any[];
    person_posts?: any[];
    person_stories?: any[];
    person_post_likes?: any[];
    person_stats?: any;
    static get tableName(): string;
    $beforeInsert(): void;
    $beforeUpdate(): void;
    static get idColumn(): string;
    static get nameColumn(): string;
    static get emailColumn(): string;
    static get passwordColumn(): string;
    static get createdAtColumn(): string;
    static get updatedAtColumn(): string;
    static get isDeletedColumn(): string;
    static get jsonSchema(): object;
    static get relationMappings(): RelationMappings;
    static get modifiers(): Record<string, (builder: QueryBuilder<PersonsModel>) => void>;
    static getPersonDetailsByEmail(email: string): Promise<PersonWithStats | undefined>;
    static checkIfPersonExistsByEmail(email: string): Promise<PersonsModel | undefined>;
    static checkIfPersonExistsById(id: number): Promise<PersonsModel | undefined>;
    static checkIfPersonExistsByUUID(uuid: string): Promise<PersonsModel | undefined>;
    static getPersonDetailsByUUID(uuid: string): Promise<PersonWithStats | undefined>;
}
export default PersonsModel;
//# sourceMappingURL=PersonsModel.d.ts.map