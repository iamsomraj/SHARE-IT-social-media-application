const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const { generateToken, validateHash } = require("../../utils/index.js");

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

  const user = await Person.query().findOne({
    email: req.user.email,
  });

  if (user) {
    const posts = await Person.relatedQuery("posts")
      .for(user.id)
      .orderBy("createdAt", "DESC");
    const followers = await Person.relatedQuery("followers").for(user.id);
    const followings = await Person.relatedQuery("followings").for(user.id);

    for (let post of posts) {
      const likesOnPost = await Like.query().where("master_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { id: user.id, name: user.name, email: user.email };
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
