const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @description fetches list of people to show in the explore page
 * @route GET /api/v1/persons/people?page=<___>&limit=<___>
 * @access private
 */
const getPeople = asyncHandler(async (req, res) => {
  const { user } = req;
  const { page, limit } = req.query;
  const personService = new PersonService();
  const result = await personService.getPeople(user, page, limit);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FETCH_PEOPLE_SUCCESS,
  });
});

module.exports = getPeople;
