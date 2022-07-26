const asyncHandler = require("express-async-handler");
const PersonService = require("../../services/Person/PersonService.js");
const { PERSON_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @access public
 * @description logins one person
 * @route POST /api/v1/persons/auth
 */
const loginPerson = asyncHandler(async (req, res) => {
  const personService = new PersonService();
  const { email, password } = req.body;
  const result = await personService.loginPerson(email, password);

  res.json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.LOGIN_SUCCESS,
  });
});

module.exports = loginPerson;
