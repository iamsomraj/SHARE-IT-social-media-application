"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowingsModel_1 = __importDefault(require("../../models/FollowingsModel"));
const PersonStatsModel_1 = __importDefault(require("../../models/PersonStatsModel"));
const PostLikesModel_1 = __importDefault(require("../../models/PostLikesModel"));
const PostsModel_1 = __importDefault(require("../../models/PostsModel"));
const PostStatsModel_1 = __importDefault(require("../../models/PostStatsModel"));
const StoriesModel_1 = __importDefault(require("../../models/StoriesModel"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
const errors_1 = require("../../utils/errors");
const postNotFound = () => new errors_1.HttpError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
/**
 * Handles all post-related business logic.
 */
class PostService {
    /**
     * @route POST /api/v1/posts/like/:uuid
     */
    async addLike(user, uuid) {
        const post = await this.findActivePost(uuid);
        const existingLike = await PostLikesModel_1.default.query().findOne({
            post_id: post.id,
            created_by: user.id,
        });
        if (!existingLike) {
            await PostsModel_1.default.transaction(async (trx) => {
                await PostLikesModel_1.default.query(trx).insert({
                    post_id: post.id,
                    created_by: user.id,
                    updated_by: user.id,
                });
                await PostStatsModel_1.default.query(trx)
                    .where('post_id', post.id)
                    .increment('like_count', 1);
            });
        }
        return this.getPostDetailsOrThrow(uuid);
    }
    /**
     * @route POST /api/v1/posts/unlike/:uuid
     */
    async removeLike(user, uuid) {
        const post = await this.findActivePost(uuid);
        await PostsModel_1.default.transaction(async (trx) => {
            const deleted = await PostLikesModel_1.default.query(trx)
                .delete()
                .where({ post_id: post.id, created_by: user.id });
            if (deleted > 0) {
                await PostStatsModel_1.default.query(trx)
                    .where('post_id', post.id)
                    .decrement('like_count', deleted);
            }
        });
        return this.getPostDetailsOrThrow(uuid);
    }
    /**
     * @route POST /api/v1/posts/add-story/:post_uuid
     */
    async addStory(user, postUuid) {
        const post = await this.findActivePost(postUuid);
        const existingStory = await StoriesModel_1.default.query().findOne({
            post_id: post.id,
            person_id: user.id,
        });
        if (existingStory) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.ALREADY_STORY_POST);
        }
        await PostsModel_1.default.transaction(async (trx) => {
            await StoriesModel_1.default.query(trx).insert({
                post_id: post.id,
                person_id: user.id,
            });
            await PostStatsModel_1.default.query(trx)
                .where('post_id', post.id)
                .increment('story_count', 1);
        });
        return this.getPostDetailsOrThrow(postUuid);
    }
    /**
     * @route POST /api/v1/posts/remove-story/:post_uuid
     */
    async removeStory(user, postUuid) {
        const post = await this.findActivePost(postUuid);
        await PostsModel_1.default.transaction(async (trx) => {
            const deleted = await StoriesModel_1.default.query(trx)
                .delete()
                .where({ post_id: post.id, person_id: user.id });
            if (deleted === 0) {
                throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.NOT_STORY_YET);
            }
            await PostStatsModel_1.default.query(trx)
                .where('post_id', post.id)
                .decrement('story_count', deleted);
        });
        return this.getPostDetailsOrThrow(postUuid);
    }
    /**
     * @route POST /api/v1/posts/create
     */
    async createPost(user, content) {
        const post = await PostsModel_1.default.transaction(async (trx) => {
            const inserted = await PostsModel_1.default.query(trx).insertAndFetch({
                content,
                created_by: user.id,
                updated_by: user.id,
                is_deleted: false,
            });
            await PostStatsModel_1.default.query(trx).insert({
                post_id: inserted.id,
                like_count: 0,
                comment_count: 0,
                story_count: 0,
            });
            await PersonStatsModel_1.default.query(trx)
                .where('person_id', user.id)
                .increment('post_count', 1);
            return inserted;
        });
        const details = await PostsModel_1.default.getPostDetails(post.uuid);
        if (!details) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.POST_FAILURE);
        }
        return details;
    }
    /**
     * Posts from the user and everyone they follow.
     * @route GET /api/v1/posts/feed
     */
    async getFeedPosts(user) {
        const followings = await FollowingsModel_1.default.query()
            .select('followed_id')
            .where('follower_id', user.id);
        const personIds = [user.id, ...followings.map(f => f.followed_id)];
        return PostsModel_1.default.query()
            .whereIn('created_by', personIds)
            .where('is_deleted', false)
            .withGraphFetched('[creator(defaultSelects), post_likes(orderByLatest).creator(defaultSelects), post_stats, post_stories.creator(defaultSelects)]')
            .modify('orderByLatest');
    }
    /**
     * Posts the user has added to their story.
     * @route GET /api/v1/posts/stories
     */
    async getStories(user) {
        return PostsModel_1.default.query()
            .whereExists(StoriesModel_1.default.query()
            .whereColumn('stories.post_id', 'posts.id')
            .where('stories.person_id', user.id))
            .where('is_deleted', false)
            .withGraphFetched('[post_stories.creator(defaultSelects), creator(defaultSelects), post_stats, post_likes.creator(defaultSelects)]')
            .modify('orderByLatest');
    }
    /**
     * @route GET /api/v1/posts/:uuid
     */
    async fetchPost(uuid) {
        return this.getPostDetailsOrThrow(uuid);
    }
    async findActivePost(uuid) {
        const post = await PostsModel_1.default.query().findOne({ uuid, is_deleted: false });
        if (!post) {
            throw postNotFound();
        }
        return post;
    }
    async getPostDetailsOrThrow(uuid) {
        const post = await PostsModel_1.default.getPostDetails(uuid);
        if (!post) {
            throw postNotFound();
        }
        return post;
    }
}
exports.default = new PostService();
//# sourceMappingURL=PostService.js.map