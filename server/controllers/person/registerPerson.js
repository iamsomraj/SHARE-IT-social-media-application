const asyncHandler = require("express-async-handler");
const Person = require("../../models/Person.js");
const { generateToken, hash } = require("../../utils/index.js");

/**
 * @access public
 * @description registers one person
 * @route POST /api/v1/users/
 */
const registerPerson = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("User data is invalid");
  }

  const doesUserExist = await Person.query().findOne({
    email,
  });

  /**
   * when email id is already taken
   */
  if (doesUserExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Person.query().insert({
    name,
    email,
    password: hash(password),
  });

  if (registerPerson) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong in User Creation");
  }
});

module.exports = registerPerson;
