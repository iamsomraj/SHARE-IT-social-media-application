const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @description GETS THE LIST OF PEOPLE FOR WHICH SEARCH QUERY IS MATCHED
 * @route POST /api/v1/persons/search
 * @access private
 */
const search = asyncHandler(async (req, res) => {
  const { searchQuery } = req.body;
  const { user } = req;
  const personService = new PersonService();
  const result = await personService.search(user, searchQuery);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.SEARCH_SUCCESS,
  });
});

module.exports = search;
