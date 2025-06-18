"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
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
    static get postIdColumn() {
        return 'post_id';
    }
    static get likeCountColumn() {
        return 'like_count';
    }
    static get commentCountColumn() {
        return 'comment_count';
    }
    static get storyCountColumn() {
        return 'story_count';
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
        const PostsModel = require('@/models/PostsModel').default;
        return {
            post: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PostsModel,
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