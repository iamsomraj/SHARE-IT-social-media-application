const ENVIRONMENT = require("../utils/constants/environments");
const HTTP_CODES = require("../utils/constants/http-codes");
const { GENERAL_MESSAGES } = require("../utils/constants/messages");

const pageNotFound = (req, res, next) => {
  const error = new Error(`Page Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = !err.status ? HTTP_CODES.INTERNAL_SERVER_ERROR : err.status;

  const result = {
    state: false,
    message: err?.message || GENERAL_MESSAGES.SOMETHING_WENT_WRONG,
    data: ENVIRONMENT.IS_PRODUCTION ? "" : err.stack,
  };

  if (ENVIRONMENT.IS_DEVELOPMENT) console.error(result);

  res.status(statusCode).json(result);
};

module.exports = {
  pageNotFound,
  errorHandler,
};
