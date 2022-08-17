const asyncHandler = require("express-async-handler");
const AuthService = require("../../services/Auth/AuthService.js");
const HTTP_CODES = require("../../utils/constants/http-codes.js");
const { AUTH_SUCCESS_MESSAGES } = require("../../utils/constants/messages.js");

/**
 * @description authorize user with given user credentials ( uuid, token)
 * @route POST /api/v1/auth
 * @access public
 */
const authorizeUser = asyncHandler(async (req, res) => {
  const { uuid, token } = req.body;
  const authService = new AuthService();
  const result = await authService.authorize(uuid, token);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: AUTH_SUCCESS_MESSAGES.AUTHORIZE_SUCCESS,
  });
});

module.exports = authorizeUser;
