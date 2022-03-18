const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Post = require("../../models/Post.js");

/**
 * @access private
 * @description adds one like for one post
 * @route POST /api/v1/posts/:id
 */
const addLike = asyncHandler(async (req, res) => {
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

  await Like.query().insert({
    master_id: post.id,
    owner_id: req.user.id,
  });

  const posts = await Person.relatedQuery("posts")
    .for(req.user.id)
    .orderBy("createdAt");
  const followers = await Person.relatedQuery("followers").for(req.user.id);
  const followings = await Person.relatedQuery("followings").for(req.user.id);
  const likes = await Person.relatedQuery("likes").for(req.user.id);

  for (let post of posts) {
    const likesOnPost = await Like.query().where("master_id", "=", post.id);
    post.likesOnPost = likesOnPost;
  }

  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    posts,
    followers,
    followings,
    likes,
  });
});

module.exports = addLike;
