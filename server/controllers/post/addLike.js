const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description adds one like for one post
 * @route POST /api/v1/posts/like/:uuid
 */
const addLike = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const { user } = req;
  const postService = new PostService();
  const result = await postService.addLike(user, uuid);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.LIKE_SUCCESS,
  });
});

module.exports = addLike;
