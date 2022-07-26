const asyncHandler = require("express-async-handler");
const Like = require("../../models/Like.js");
const Person = require("../../models/Person.js");
const Following = require("../../models/Following.js");
const { GENERAL_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access private
 * @description adds follower to a person
 * @route POST /api/v1/persons/follow/:uuid
 */
const followPerson = asyncHandler(async (req, res) => {
  const uuid = req.params.uuid;
  if (!req || !req.user || !uuid) {
    res.status(400);
    throw new Error(GENERAL_MESSAGES.INVALID_REQUEST);
  }

  const personToBeFollowed = await Person.query().findOne({ uuid });

  if (!personToBeFollowed) {
    res.status(404);
    throw new Error("Person not found!");
  }

  if (!req || !req.user) {
    res.status(400);
    throw new Error(GENERAL_MESSAGES.INVALID_REQUEST);
  }

  const followRecord = await Following.query().insert({
    follower_id: req.user.id,
    followed_id: personToBeFollowed.id,
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
