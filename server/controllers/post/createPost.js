const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const PostsModel = require("../../models/PostsModel.js");

/**
 * @access private
 * @description creates post
 * @route POST /api/v1/posts/create
 */
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const created_by = req.user.id;

  if (!content) {
    res.status(400);
    throw new Error("PostsModel data is invalid!");
  }

  const post = await PostsModel.query().insert({
    content,
    created_by,
  });

  if (post) {
    res.status(201);
    res.json({
      post,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong in Post Creation");
  }
});

module.exports = createPost;
