const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description marks a post as favourite for a given user
 * @route POST /api/v1/posts/story/:post_uuid
 */
const addLike = asyncHandler(async (req, res) => {
  const { post_uuid } = req.params;
  const { user } = req;
  const postService = new PostService();
  const result = await postService.addFavourite(user, post_uuid);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.STORY_SUCCESS,
  });
});

module.exports = addLike;
