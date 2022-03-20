const asyncHandler = require("express-async-handler");
const Person = require("../../models/Person.js");

/**
 * @access private
 * @description adds follower to a person
 * @route POST /api/v1/persons/people
 */
const getPeople = asyncHandler(async (req, res) => {
  if (!req || !req.user) {
    res.status(400);
    throw new Error("Request is invalid!");
  }

  const people = await Person.query()
    .select("id", "name", "email")
    .where("id", "!=", req.user.id);

  if (!people) {
    res.status(404);
    throw new Error("People are not found!");
  }

  if (people) {
    res.json({
      people,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong during Find People operation");
  }
});

module.exports = getPeople;
