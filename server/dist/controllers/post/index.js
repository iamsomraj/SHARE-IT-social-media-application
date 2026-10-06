"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStory = exports.addStory = exports.removeLike = exports.addLike = exports.fetchPost = exports.getStories = exports.getFeedPosts = exports.createPost = void 0;
const auth_1 = require("../../middlewares/auth");
const PostService_1 = __importDefault(require("../../services/Post/PostService"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
/**
 * @description creates a post
 * @route POST /api/v1/posts/create
 * @access private
 */
const createPost = async (req, res) => {
    const data = await PostService_1.default.createPost((0, auth_1.requireUser)(req), req.body.content);
    res.status(http_codes_1.HTTP_CODES.CREATED).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.POST_SUCCESS,
    });
};
exports.createPost = createPost;
/**
 * @description gets the feed for the user
 * @route GET /api/v1/posts/feed
 * @access private
 */
const getFeedPosts = async (req, res) => {
    const data = await PostService_1.default.getFeedPosts((0, auth_1.requireUser)(req));
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.PERSON_FEED_SUCCESS,
    });
};
exports.getFeedPosts = getFeedPosts;
/**
 * @description gets the stories of the user
 * @route GET /api/v1/posts/stories
 * @access private
 */
const getStories = async (req, res) => {
    const data = await PostService_1.default.getStories((0, auth_1.requireUser)(req));
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.PERSON_FAVOURTIE_SUCCESS,
    });
};
exports.getStories = getStories;
/**
 * @description fetches a post by uuid
 * @route GET /api/v1/posts/:uuid
 * @access private
 */
const fetchPost = async (req, res) => {
    const data = await PostService_1.default.fetchPost(req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.FETCH_POST_SUCCESS,
    });
};
exports.fetchPost = fetchPost;
/**
 * @description likes a post
 * @route POST /api/v1/posts/like/:uuid
 * @access private
 */
const addLike = async (req, res) => {
    const data = await PostService_1.default.addLike((0, auth_1.requireUser)(req), req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.CREATED).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.LIKE_SUCCESS,
    });
};
exports.addLike = addLike;
/**
 * @description removes a like from a post
 * @route POST /api/v1/posts/unlike/:uuid
 * @access private
 */
const removeLike = async (req, res) => {
    const data = await PostService_1.default.removeLike((0, auth_1.requireUser)(req), req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.UNLIKE_SUCCESS,
    });
};
exports.removeLike = removeLike;
/**
 * @description adds a post to the user's story
 * @route POST /api/v1/posts/add-story/:post_uuid
 * @access private
 */
const addStory = async (req, res) => {
    const data = await PostService_1.default.addStory((0, auth_1.requireUser)(req), req.params.post_uuid);
    res.status(http_codes_1.HTTP_CODES.CREATED).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.STORY_SUCCESS,
    });
};
exports.addStory = addStory;
/**
 * @description removes a post from the user's story
 * @route POST /api/v1/posts/remove-story/:post_uuid
 * @access private
 */
const removeStory = async (req, res) => {
    const data = await PostService_1.default.removeStory((0, auth_1.requireUser)(req), req.params.post_uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.UNSTORY_SUCCESS,
    });
};
exports.removeStory = removeStory;
//# sourceMappingURL=index.js.map