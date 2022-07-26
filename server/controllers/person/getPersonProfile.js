const Person = require("../../models/Person.js");
const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");

/**
 * @access private
 * @description fetches every detail about one person by uuid
 * @route GET /api/v1/persons/:uuid
 */
const getPersonProfile = asyncHandler(async (req, res) => {
  console.log("🚀 ~ file: getPersonProfile.js ~ line 11 ~ getPersonProfile ~ req", req.params);
  const uuid = req.params.uuid;
  const person = await Person.query().findOne({ uuid });
  console.log("🚀 ~ file: getPersonProfile.js ~ line 14 ~ getPersonProfile ~ person", person);

  if (person) {
    const posts = await Person.relatedQuery("posts").for(person.id).orderBy("createdAt", "DESC");
    const followings = await Person.relatedQuery("followers").for(person.id);
    const followers = await Person.relatedQuery("followings").for(person.id);

    for (let post of posts) {
      const likesOnPost = await Like.query().where("master_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { id: person.id, name: person.name, email: person.email };
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
