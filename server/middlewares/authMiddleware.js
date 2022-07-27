const asyncHandler = require("express-async-handler");
const AuthService = require("../services/Auth/AuthService.js");

const protect = asyncHandler(async (req, res, next) => {
  const authService = new AuthService();
  const result = await authService.getUserFromToken(req);
  req.user = result;
  next();
});

module.exports = protect;
