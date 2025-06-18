"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RootService_1 = __importDefault(require("../Root/RootService"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
const FollowingsModel_1 = __importDefault(require("../../models/FollowingsModel"));
const PostsModel_1 = __importDefault(require("../../models/PostsModel"));
const PostStatsModel_1 = __importDefault(require("../../models/PostStatsModel"));
const PersonStatsModel_1 = __importDefault(require("../../models/PersonStatsModel"));
const PostLikesModel_1 = __importDefault(require("../../models/PostLikesModel"));
const StoriesModel_1 = __importDefault(require("../../models/StoriesModel"));
class PostService extends RootService_1.default {
    constructor() {
        super();
    }
    async addLike(user, uuid) {
        if (!uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.query().findOne({
            uuid,
            is_deleted: false,
        });
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        const postLikeRecord = await PostLikesModel_1.default.query().findOne({
            post_id: postRecord.id,
            created_by: user.id,
        });
        if (!postLikeRecord) {
            const likeRecord = await PostLikesModel_1.default.query().insert({
                post_id: postRecord.id,
                created_by: user.id,
                updated_by: user.id,
            });
            if (!likeRecord) {
                this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.LIKE_FAILURE);
            }
            await PostStatsModel_1.default.query()
                .where('post_id', postRecord.id)
                .increment('like_count', 1);
        }
        const updatedPost = await PostsModel_1.default.getPostDetails(uuid);
        if (!updatedPost) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        return updatedPost;
    }
    async addStory(user, post_uuid) {
        if (!post_uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.query().findOne({
            uuid: post_uuid,
            is_deleted: false,
        });
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        const storyRecord = await StoriesModel_1.default.query().findOne({
            post_id: postRecord.id,
            person_id: user.id,
        });
        if (storyRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.ALREADY_STORY_POST);
        }
        const insertedStory = await StoriesModel_1.default.query().insert({
            post_id: postRecord.id,
            person_id: user.id,
        });
        if (!insertedStory) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.STORY_FAILURE);
        }
        await PostStatsModel_1.default.query()
            .where('post_id', postRecord.id)
            .increment('story_count', 1);
        const updatedPost = await PostsModel_1.default.getPostDetails(post_uuid);
        if (!updatedPost) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        return updatedPost;
    }
    async removeStory(user, post_uuid) {
        if (!post_uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.query().findOne({
            uuid: post_uuid,
            is_deleted: false,
        });
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        const storyRecord = await StoriesModel_1.default.query().findOne({
            post_id: postRecord.id,
            person_id: user.id,
        });
        if (!storyRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.NOT_STORY_YET);
        }
        await StoriesModel_1.default.query().delete().where({
            post_id: postRecord.id,
            person_id: user.id,
        });
        await PostStatsModel_1.default.query()
            .where('post_id', postRecord.id)
            .decrement('story_count', 1);
        const updatedPost = await PostsModel_1.default.getPostDetails(post_uuid);
        if (!updatedPost) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        return updatedPost;
    }
    async removeLike(user, uuid) {
        if (!uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.query().findOne({
            uuid,
            is_deleted: false,
        });
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        const postLikeRecord = await PostLikesModel_1.default.query().findOne({
            post_id: postRecord.id,
            created_by: user.id,
        });
        if (postLikeRecord) {
            await PostLikesModel_1.default.query().delete().where({
                post_id: postRecord.id,
                created_by: user.id,
            });
            await PostStatsModel_1.default.query()
                .where('post_id', postRecord.id)
                .decrement('like_count', 1);
        }
        const updatedPost = await PostsModel_1.default.getPostDetails(uuid);
        if (!updatedPost) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        return updatedPost;
    }
    async createPost(user, content) {
        if (!content) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.query().insertAndFetch({
            content,
            created_by: user.id,
            updated_by: user.id,
            is_deleted: false,
        });
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.POST_FAILURE);
        }
        await PostStatsModel_1.default.query().insert({
            post_id: postRecord.id,
            like_count: 0,
            comment_count: 0,
            story_count: 0,
        });
        await PersonStatsModel_1.default.query()
            .where('person_id', user.id)
            .increment('post_count', 1);
        const completePostData = await PostsModel_1.default.getPostDetails(postRecord.uuid);
        if (!completePostData) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.POST_FAILURE);
        }
        return completePostData;
    }
    async getFeedPosts(user) {
        const followingIds = await FollowingsModel_1.default.query()
            .where('follower_id', user.id)
            .select('followed_id');
        const followingPersonIds = followingIds.map(follow => follow.followed_id);
        followingPersonIds.push(user.id);
        const feedPosts = await PostsModel_1.default.query()
            .whereIn('created_by', followingPersonIds)
            .where('is_deleted', false)
            .withGraphFetched('[creator(defaultSelects), post_likes(orderByLatest).creator(defaultSelects), post_stats, post_stories.creator(defaultSelects)]')
            .modify('orderByLatest');
        return feedPosts;
    }
    async getStories(user) {
        const followingIds = await FollowingsModel_1.default.query()
            .where('follower_id', user.id)
            .select('followed_id');
        const followingPersonIds = followingIds.map(follow => follow.followed_id);
        followingPersonIds.push(user.id);
        const postsWithStories = await PostsModel_1.default.query()
            .whereExists(StoriesModel_1.default.query()
            .whereColumn('post_id', 'posts.id')
            .where('person_id', user.id))
            .where('is_deleted', false)
            .withGraphFetched('[post_stories.creator(defaultSelects), creator(defaultSelects), post_stats, post_likes.creator(defaultSelects)]')
            .modify('orderByLatest');
        return postsWithStories;
    }
    async fetchPost(uuid) {
        if (!uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
        }
        const postRecord = await PostsModel_1.default.getPostDetails(uuid);
        if (!postRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.GENERAL_MESSAGES.POST_NOT_FOUND);
        }
        return postRecord;
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map