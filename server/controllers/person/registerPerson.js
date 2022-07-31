const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access public
 * @description registers one person
 * @route POST /api/v1/persons/
 * @access public
 */
const registerPerson = asyncHandler(async (req, res) => {
  const personService = new PersonService();
  const { name, email, password } = req.body;
  const result = await personService.registerPerson(name, email, password);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.REGISTER_SUCCESS,
  });
});

module.exports = registerPerson;
