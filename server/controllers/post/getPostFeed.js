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
  const followingRecords = await Person.relatedQuery("followers").for(
    req.user.id
  );
  const followingRecordIdList = followingRecords.map(
    (person) => person.followed_id
  );

  let posts = [];
  for (let follower_id of followingRecordIdList) {
    const postRecords = await Post.query()
      .where("owner_id", "=", follower_id)
      .orderBy("createdAt", "DESC");
    posts.push(...postRecords);
  }

  for (let post of posts) {
    const likesOnPost = await Like.query().where("master_id", "=", post.id);
    const personRecord = await Person.query().findOne({ id: post.owner_id });
    post.likesOnPost = likesOnPost;
    post.owner = {
      id: personRecord.id,
      name: personRecord.name,
      email: personRecord.email,
    };
  }

  /**
   * Sorting latest posts based on created date
   */
  posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  res.json({
    posts,
  });
});

module.exports = getPostFeed;
