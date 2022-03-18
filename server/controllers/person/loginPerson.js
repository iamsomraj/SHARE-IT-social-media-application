const asyncHandler = require("express-async-handler");
const Person = require("../../models/Person.js");
const { generateToken, validateHash } = require("../../utils/index.js");

/**
 * @access public
 * @description logins one person
 * @route POST /api/v1/persons/auth
 */
const loginPerson = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("User data is invalid!");
  }

  const user = await Person.query().findOne({
    email,
  });

  /**
   * when user exists and password also matches
   */
  if (user && validateHash(password, user.password)) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

module.exports = loginPerson;
