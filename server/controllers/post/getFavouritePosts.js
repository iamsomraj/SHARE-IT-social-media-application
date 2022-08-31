const asyncHandler = require("express-async-handler");
const PostService = require("../../services/Post/PostService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages");

/**
 * @access private
 * @description gets all the favourite post for the user
 * @route GET /api/v1/posts/stories
 */
const getFavouritePosts = asyncHandler(async (req, res) => {
  const { user } = req;
  const postService = new PostService();
  const result = await postService.getFavouritePosts(user);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.PERSON_FAVOURTIE_SUCCESS,
  });
});

module.exports = getFavouritePosts;
