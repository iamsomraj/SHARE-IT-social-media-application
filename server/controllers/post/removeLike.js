const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description removes like for post
 * @route POST /api/v1/posts/unlike/:uuid
 */
const removeLike = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const { user } = req;
  const postService = new PostService();
  const result = await postService.removeLike(user, uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.UNLIKE_SUCCESS,
  });
});

module.exports = removeLike;
