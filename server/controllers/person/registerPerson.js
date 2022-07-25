const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const { generateToken, hash } = require("../../utils/index.js");

/**
 * @access public
 * @description registers one person
 * @route POST /api/v1/persons/
 */
const registerPerson = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("User data is invalid");
  }

  const doesUserExist = await Person.query().findOne({
    email,
  });

  /**
   * when email id is already taken
   */
  if (doesUserExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Person.query().insert({
    name,
    email,
    password: hash(password),
  });

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

  if (registerPerson) {
    res.status(201).json({
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
    res.status(400);
    throw new Error("Something went wrong in User Creation");
  }
});

module.exports = registerPerson;
