const Person = require("../../models/Person.js");
const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");

/**
 * @access private
 * @description fetches every detail about one person by uuid
 * @route GET /api/v1/persons/:uuid
 */
const getPersonProfile = asyncHandler(async (req, res) => {
  let person, uuid;
  /**
   * If the same person is asking for his own profile,
   * then no further request is made to fetch person details
   */
  if (req.user.id == req.params.id) {
    person = { ...req.user };
    uuid = parseInt(person.id);
  } else {
    uuid = parseInt(req.params.id);
    person = await Person.query().findOne({ id: uuid });
  }

  if (person) {
    const posts = await Person.relatedQuery("posts").for(uuid).orderBy("createdAt", "DESC");
    const followings = await Person.relatedQuery("followers").for(uuid);
    const followers = await Person.relatedQuery("followings").for(uuid);

    for (let post of posts) {
      const likesOnPost = await Like.query().where("master_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { id: person.id, name: person.name, email: person.email };
    }

    res.json({
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
