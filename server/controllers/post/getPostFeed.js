const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Post = require("../../models/Post.js");

/**
 * @access private
 * @description gets all the post for the user
 * @route GET /api/v1/posts/feed
 */
const getPostFeed = asyncHandler(async (req, res) => {
  const followingRecords = await Person.relatedQuery("followings").for(
    req.user.id
  );
  const followingRecordIdList = followingRecords.map(
    (person) => person.follower_id
  );

  let posts = [];
  for (let follower_id of followingRecordIdList) {
    const postRecords = await Post.query()
      .where("owner_id", "=", follower_id)
      .orderBy("createdAt", "DESC");
    posts.push(postRecords);
  }

  res.json({
    posts,
  });
});

module.exports = getPostFeed;
