const asyncHandler = require("express-async-handler");
const PostLikesModel = require("../../models/PostLikesModel.js");
const PersonsModel = require("../../models/PersonsModel.js");
const FollowingsModel = require("../../models/FollowingsModel.js");
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

  const personToBeFollowed = await PersonsModel.query().findOne({ uuid });

  if (!personToBeFollowed) {
    res.status(404);
    throw new Error("Person not found!");
  }

  if (!req || !req.user) {
    res.status(400);
    throw new Error(GENERAL_MESSAGES.INVALID_REQUEST);
  }

  const followRecord = await FollowingsModel.query().insert({
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
