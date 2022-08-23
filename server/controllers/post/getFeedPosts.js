const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages");

/**
 * @access private
 * @description gets all the post for the user
 * @route GET /api/v1/posts/feed
 */
const getFeedPosts = asyncHandler(async (req, res) => {
  const { user } = req;
  const postService = new PostService();
  const result = await postService.getFeedPosts(user);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.PERSON_FEED_SUCCESS,
  });
});

module.exports = getFeedPosts;
