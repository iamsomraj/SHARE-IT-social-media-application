const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Post = require("../../models/Post.js");

/**
 * @access private
 * @description adds one like for one post
 * @route POST /api/v1/posts/create
 */
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const owner_id = req.user.id;

  if (!content) {
    res.status(400);
    throw new Error("Post data is invalid!");
  }

  const post = await Post.query().insert({
    content,
    owner_id,
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
