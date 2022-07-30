const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const { generateToken } = require("../../utils/helpers/index.js");

/**
 * @access public
 * @description fetches user data
 * @route GET /api/v1/persons/
 */
const getUserData = asyncHandler(async (req, res) => {
  if (!req || !req.user) {
    res.status(400);
    throw new Error("User data is invalid!");
  }

  const user = await PersonsModel.query().findOne({
    email: req.user.email,
  });

  if (user) {
    const posts = await PersonsModel.relatedQuery("posts").for(user.id).orderBy("created_at", "DESC");
    const followers = await PersonsModel.relatedQuery("followers").for(user.id);
    const followings = await PersonsModel.relatedQuery("followings").for(user.id);

    for (let post of posts) {
      const likesOnPost = await PostLikesModel.query().where("post_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { uuid: user.uuid, id: user.id, name: user.name, email: user.email };
    }
    res.json({
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
      posts,
      followers,
      followings,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

module.exports = getUserData;
