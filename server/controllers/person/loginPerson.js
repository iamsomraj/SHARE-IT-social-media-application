const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const { generateToken, validateHash } = require("../../utils/index.js");

/**
 * @access public
 * @description logins one person
 * @route POST /api/v1/persons/auth
 */
const loginPerson = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("User data is invalid!");
  }

  const user = await Person.query().findOne({
    email,
  });

  /**
   * when user exists and password also matches
   */
  if (user && validateHash(password, user.password)) {
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

module.exports = loginPerson;
