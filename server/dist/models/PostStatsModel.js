"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const PostsModel_1 = __importDefault(require("./PostsModel"));
class PostStatsModel extends objection_1.Model {
    id;
    post_id;
    like_count;
    comment_count;
    story_count;
    created_at;
    updated_at;
    static get tableName() {
        return 'public.post_stats';
    }
    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['post_id'],
            properties: {
                id: { type: 'integer' },
                post_id: { type: 'integer' },
                comment_count: { type: 'integer' },
                like_count: { type: 'integer' },
                story_count: { type: 'integer' },
            },
        };
    }
    static get relationMappings() {
        return {
            post: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PostsModel_1.default,
                join: {
                    from: 'public.post_stats.post_id',
                    to: 'public.posts.id',
                },
            },
        };
    }
}
exports.default = PostStatsModel;
//# sourceMappingURL=PostStatsModel.js.map