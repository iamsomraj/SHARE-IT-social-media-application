"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const PostsModel_1 = __importDefault(require("@/models/PostsModel"));
const PersonsModel_1 = __importDefault(require("@/models/PersonsModel"));
class StoriesModel extends objection_1.Model {
    id;
    post_id;
    person_id;
    created_at;
    updated_at;
    static get tableName() {
        return 'public.stories';
    }
    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
    static get idColumn() {
        return 'id';
    }
    static get postIdColumn() {
        return 'post_id';
    }
    static get personIdColumn() {
        return 'person_id';
    }
    static get createdAtColumn() {
        return 'created_at';
    }
    static get jsonSchema() {
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
    static get modifiers() {
        return {
            orderByLatest(builder) {
                builder.orderBy([
                    { column: 'created_at', order: 'desc', nulls: 'last' },
                ]);
            },
        };
    }
    static get relationMappings() {
        return {
            post: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PostsModel_1.default,
                join: {
                    from: 'public.stories.post_id',
                    to: 'public.posts.id',
                },
            },
            creator: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.stories.person_id',
                    to: 'public.persons.id',
                },
            },
        };
    }
}
exports.default = StoriesModel;
//# sourceMappingURL=StoriesModel.js.map