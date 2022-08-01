const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages");

/**
 * @description FETCHES DETAILS OF THE PERSON WITH THE GIVEN UUID
 * @route GET /api/v1/persons/:uuid
 * @access private
 */
const getPersonProfile = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const personService = new PersonService();
  const result = await personService.getPersonProfile(uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FETCH_PERSON_PROFILE_SUCCESS,
  });
});

module.exports = getPersonProfile;
