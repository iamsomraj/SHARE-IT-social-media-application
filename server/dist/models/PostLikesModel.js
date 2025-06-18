"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const PostsModel_1 = __importDefault(require("./PostsModel"));
const PersonsModel_1 = __importDefault(require("./PersonsModel"));
class PostLikesModel extends objection_1.Model {
    id;
    post_id;
    created_at;
    updated_at;
    created_by;
    updated_by;
    static get tableName() {
        return 'public.post_likes';
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
    static get createdAtColumn() {
        return 'created_at';
    }
    static get updatedAtColumn() {
        return 'updated_at';
    }
    static get createdByColumn() {
        return 'created_by';
    }
    static get updatedByColumn() {
        return 'updated_by';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['post_id', 'created_by'],
            properties: {
                id: { type: 'integer' },
                post_id: { type: 'integer' },
                created_by: { type: 'integer' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                updated_by: { type: 'integer' },
            },
        };
    }
    static get modifiers() {
        return {
            orderByLatest(builder) {
                builder.orderBy([
                    { column: 'created_at', order: 'desc', nulls: 'last' },
                    { column: 'updated_at', order: 'desc', nulls: 'last' },
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
                    from: 'public.post_likes.post_id',
                    to: 'public.posts.id',
                },
            },
            creator: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.post_likes.created_by',
                    to: 'public.persons.id',
                },
            },
            updater: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.post_likes.updated_by',
                    to: 'public.persons.id',
                },
            },
        };
    }
}
exports.default = PostLikesModel;
//# sourceMappingURL=PostLikesModel.js.map