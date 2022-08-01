const asyncHandler = require("express-async-handler");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");
const PostService = require("../../services/Post/PostService.js");

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
