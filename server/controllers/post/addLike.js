const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PostsModel = require("../../models/PostsModel.js");
const { GENERAL_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description adds one like for one post
 * @route POST /api/v1/posts/:uuid
 */
const addLike = asyncHandler(async (req, res) => {
  const uuid = req.params.uuid;
  const post = await PostsModel.query().findOne({ uuid });

  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  if (!req || !req.user) {
    res.status(400);
    throw new Error(GENERAL_MESSAGES.INVALID_REQUEST);
  }

  const likeRecord = await PostLikesModel.query().insert({
    post_id: post.id,
    created_by: req.user.id,
  });

  if (likeRecord) {
    res.json({
      likeRecord,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong during Like operation");
  }
});

module.exports = addLike;
