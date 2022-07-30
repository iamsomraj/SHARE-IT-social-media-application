const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const PostsModel = require("../../models/PostsModel.js");

/**
 * @access private
 * @description gets all the post for the user
 * @route GET /api/v1/posts/feed
 */
const getPostFeed = asyncHandler(async (req, res) => {
  const followingRecords = await PersonsModel.relatedQuery("followers").for(req.user.id);
  const followingRecordIdList = followingRecords.map((person) => person.followed_id);

  let posts = [];
  for (let follower_id of followingRecordIdList) {
    const postRecords = await PostsModel.query().where("created_by", "=", follower_id).orderBy("created_at", "DESC");
    posts.push(...postRecords);
  }

  for (let post of posts) {
    const likesOnPost = await PostLikesModel.query().where("post_id", "=", post.id);
    const personRecord = await PersonsModel.query().findOne({ id: post.created_by });
    post.likesOnPost = likesOnPost;
    post.owner = {
      uuid: personRecord.uuid,
      id: personRecord.id,
      name: personRecord.name,
      email: personRecord.email,
    };
  }

  /**
   * Sorting latest posts based on created date
   */
  posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  res.json({
    posts,
  });
});

module.exports = getPostFeed;
