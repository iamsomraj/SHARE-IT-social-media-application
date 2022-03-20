const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Post = require("../../models/Post.js");

/**
 * @access private
 * @description adds follower to a person
 * @route POST /api/v1/persons/follow/:id
 */
const followPerson = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await Post.query().findOne({ id });

  if (!post) {
    res.status(404);
    throw new Error("Post not found!");
  }

  if (!req || !req.user) {
    res.status(400);
    throw new Error("Request is invalid!");
  }

  const likeExists = await Like.query().findOne({
    master_id: post.id,
    owner_id: req.user.id,
  });

  if (likeExists) {
    res.status(400);
    throw new Error("Invalid duplicate like operation!");
  }

  const likeRecord = await Like.query().insert({
    master_id: post.id,
    owner_id: req.user.id,
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

module.exports = followPerson;
