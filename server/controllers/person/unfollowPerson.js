const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @description UNFOLLOWS A PERSON
 * @route POST /api/v1/persons/unfollow/:uuid
 * @access private
 */
const unfollowPerson = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const { user } = req;
  const personService = new PersonService();
  const result = await personService.unfollowPerson(user, uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
  });
});

module.exports = unfollowPerson;
