const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Person = require("../models/Person.js");

const protect = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization?.split(" ")?.[1] || "";
      if (!token) throw new Error("No token found!");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Person.query().findOne({ id: parseInt(decoded.id) });
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
});

module.exports = protect;
