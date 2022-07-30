const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const { generateToken, hash } = require("../../utils/helpers/index.js");

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

  const doesUserExist = await PersonsModel.query().findOne({
    email,
  });

  /**
   * when email id is already taken
   */
  if (doesUserExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await PersonsModel.query().insert({
    name,
    email,
    password: hash(password),
  });

  const posts = await PersonsModel.relatedQuery("posts").for(user.id).orderBy("created_at", "DESC");
  const followers = await PersonsModel.relatedQuery("followers").for(user.id);
  const followings = await PersonsModel.relatedQuery("followings").for(user.id);

  for (let post of posts) {
    const likesOnPost = await PostLikesModel.query().where("post_id", "=", post.id);
    post.likesOnPost = likesOnPost;
    post.owner = { uuid: user.uuid, id: user.id, name: user.name, email: user.email };
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
