const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const PostsModel = require("../../models/PostsModel.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description creates post
 * @route POST /api/v1/posts/create
 */
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { user } = req;

  const postService = new PostService();
  const result = await postService.createPost(user, content);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.POST_SUCCESS,
  });
});

module.exports = createPost;
