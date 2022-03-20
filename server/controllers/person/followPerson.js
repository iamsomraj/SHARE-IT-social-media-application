const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Following = require("../../models/Following.js");

/**
 * @access private
 * @description adds follower to a person
 * @route POST /api/v1/persons/follow/:id
 */
const followPerson = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (!req || !req.user || !id) {
    res.status(400);
    throw new Error("Request is invalid!");
  }

  const personToBeFollowed = await Person.query().findOne({ id });

  if (!personToBeFollowed) {
    res.status(404);
    throw new Error("Person not found!");
  }

  if (!req || !req.user) {
    res.status(400);
    throw new Error("Request is invalid!");
  }

  const followRecord = await Following.query().insert({
    follower_id: req.user.id,
    followed_id: id,
  });

  if (followRecord) {
    res.json({
      followRecord,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong during Follow operation");
  }
});

module.exports = followPerson;
