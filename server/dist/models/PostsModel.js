"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const node_crypto_1 = require("node:crypto");
const PersonsModel_1 = __importDefault(require("./PersonsModel"));
const PostLikesModel_1 = __importDefault(require("./PostLikesModel"));
const PostStatsModel_1 = __importDefault(require("./PostStatsModel"));
const StoriesModel_1 = __importDefault(require("./StoriesModel"));
class PostsModel extends objection_1.Model {
    id;
    uuid;
    content;
    created_at;
    updated_at;
    created_by;
    updated_by;
    is_deleted;
    static get tableName() {
        return 'public.posts';
    }
    $beforeInsert() {
        this.created_at = new Date().toISOString();
        this.uuid = (0, node_crypto_1.randomUUID)();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['content', 'created_by'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                content: { type: 'string', minLength: 1, maxLength: 500 },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                created_by: { type: 'integer' },
                updated_by: { type: 'integer' },
                is_deleted: { type: 'boolean' },
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
            post_stats: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: PostStatsModel_1.default,
                join: {
                    from: 'public.posts.id',
                    to: 'public.post_stats.post_id',
                },
            },
            post_likes: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: PostLikesModel_1.default,
                join: {
                    from: 'public.posts.id',
                    to: 'public.post_likes.post_id',
                },
            },
            post_stories: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: StoriesModel_1.default,
                join: {
                    from: 'public.posts.id',
                    to: 'public.stories.post_id',
                },
            },
            creator: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.posts.created_by',
                    to: 'public.persons.id',
                },
            },
            updater: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.posts.updated_by',
                    to: 'public.persons.id',
                },
            },
        };
    }
    /** Fetches a post with likes, stories, stats and creator. */
    static async getPostDetails(uuid) {
        return PostsModel.query()
            .findOne({ uuid })
            .withGraphFetched('[post_likes(orderByLatest).creator(defaultSelects), post_stories(orderByLatest).creator(defaultSelects), post_stats, creator(defaultSelects)]');
    }
}
exports.default = PostsModel;
//# sourceMappingURL=PostsModel.js.map