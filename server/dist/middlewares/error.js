"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.pageNotFound = void 0;
const environments_1 = require("../utils/constants/environments");
const http_codes_1 = require("../utils/constants/http-codes");
const messages_1 = require("../utils/constants/messages");
const pageNotFound = (req, res, next) => {
    const error = new Error(`Page Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.pageNotFound = pageNotFound;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = !err.status
        ? http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR
        : err.status;
    const result = {
        state: false,
        message: err?.message || messages_1.GENERAL_MESSAGES.SOMETHING_WENT_WRONG,
        data: environments_1.IS_PRODUCTION ? '' : err.stack,
    };
    if (environments_1.IS_DEVELOPMENT) {
        console.error(result);
    }
    res.status(statusCode).json(result);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map