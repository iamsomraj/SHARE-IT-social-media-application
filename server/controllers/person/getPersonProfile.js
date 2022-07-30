const PersonsModel = require("../../models/PersonsModel.js");
const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");

/**
 * @access private
 * @description fetches every detail about one person by uuid
 * @route GET /api/v1/persons/:uuid
 */
const getPersonProfile = asyncHandler(async (req, res) => {
  const uuid = req.params.uuid;
  const person = await PersonsModel.query().findOne({ uuid });

  if (person) {
    const posts = await PersonsModel.relatedQuery("posts").for(person.id).orderBy("created_at", "DESC");
    const followings = await PersonsModel.relatedQuery("followers").for(person.id);
    const followers = await PersonsModel.relatedQuery("followings").for(person.id);

    for (let post of posts) {
      const likesOnPost = await PostLikesModel.query().where("post_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { uuid: person.uuid, id: person.id, name: person.name, email: person.email };
    }

    res.json({
      uuid: person.uuid,
      id: person.id,
      name: person.name,
      email: person.email,
      posts,
      followers,
      followings,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = getPersonProfile;
