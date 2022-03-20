const Person = require("../../models/Person.js");
const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");

/**
 * @access private
 * @description fetches every detail about one person by id
 * @route GET /api/v1/persons/:id
 */
const getPersonProfile = asyncHandler(async (req, res) => {
  let person, id;
  /**
   * If the same person is asking for his own profile,
   * then no further request is made to fetch person details
   */
  if (req.user.id == req.params.id) {
    person = { ...req.user };
    id = parseInt(person.id);
  } else {
    id = parseInt(req.params.id);
    person = await Person.query().findOne({ id });
  }

  if (person) {
    const posts = await Person.relatedQuery("posts")
      .for(id)
      .orderBy("createdAt", "DESC");
    const followers = await Person.relatedQuery("followers").for(id);
    const followings = await Person.relatedQuery("followings").for(id);

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
