const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @description FOLLOWS A PERSON
 * @route POST /api/v1/persons/follow/:uuid
 * @access private
 */
const followPerson = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const { user } = req;
  const personService = new PersonService();
  const result = await personService.followPerson(user, uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
  });
});

module.exports = followPerson;
