"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.pageNotFound = void 0;
const env_1 = require("../config/env");
const http_codes_1 = require("../utils/constants/http-codes");
const messages_1 = require("../utils/constants/messages");
const errors_1 = require("../utils/errors");
const pageNotFound = (req, _res, next) => {
    next(new errors_1.HttpError(http_codes_1.HTTP_CODES.NOT_FOUND, `Page Not Found - ${req.originalUrl}`));
};
exports.pageNotFound = pageNotFound;
const errorHandler = (err, _req, res, 
// Express identifies error handlers by arity, so `next` must stay.
_next) => {
    const isHttpError = err instanceof errors_1.HttpError;
    const statusCode = isHttpError
        ? err.status
        : http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR;
    if (!isHttpError) {
        console.error(err);
    }
    // Never leak internal error details (SQL, stack traces) in production.
    const message = isHttpError || !(0, env_1.isProduction)()
        ? err.message || messages_1.GENERAL_MESSAGES.SOMETHING_WENT_WRONG
        : messages_1.GENERAL_MESSAGES.SOMETHING_WENT_WRONG;
    const result = {
        state: false,
        message,
        ...((0, env_1.isProduction)() ? {} : { data: err.stack ?? '' }),
    };
    res.status(statusCode).json(result);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map