const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const HTTP_CODES = require('../../utils/constants/http-codes.js');
const { PERSON_SUCCESS_MESSAGES } = require('../../utils/constants/messages.js');

/**
 * @description FETCHES DETAILS OF THE LOGGED IN USER
 * @route GET /api/v1/persons/
 * @access private
 */
const getUserData = asyncHandler(async (req, res) => {
  const { user } = req;
  const personService = new PersonService();
  const result = await personService.getUserData(user);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FETCH_USER_DATA_SUCCESS,
  });
});

module.exports = getUserData;
