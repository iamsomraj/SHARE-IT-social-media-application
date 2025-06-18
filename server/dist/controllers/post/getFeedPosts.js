"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedPosts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const PostService_1 = __importDefault(require("../../services/Post/PostService"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
exports.getFeedPosts = (0, express_async_handler_1.default)(async (req, res) => {
    const { user } = req;
    if (!user) {
        throw new Error('User not authenticated');
    }
    const postService = new PostService_1.default();
    const result = await postService.getFeedPosts(user);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data: result,
        message: messages_1.PERSON_SUCCESS_MESSAGES.PERSON_FEED_SUCCESS,
    });
});
//# sourceMappingURL=getFeedPosts.js.map