const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages");

/**
 * @access private
 * @description fetches post details with the given uuid of the post
 * @route GET /api/v1/posts/:uuid
 */
const fetchPost = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const postService = new PostService();
  const result = await postService.fetchPost(uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FETCH_POST_SUCCESS,
  });
});

module.exports = fetchPost;
