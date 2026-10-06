"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = exports.authenticateToken = void 0;
const http_codes_1 = require("../utils/constants/http-codes");
const messages_1 = require("../utils/constants/messages");
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
const BEARER_PREFIX = 'Bearer ';
const extractBearerToken = (authHeader) => authHeader?.startsWith(BEARER_PREFIX)
    ? authHeader.slice(BEARER_PREFIX.length)
    : null;
/** Rejects the request unless it carries a valid bearer JWT. */
const authenticateToken = (req, res, next) => {
    const token = extractBearerToken(req.headers.authorization);
    try {
        if (!token) {
            throw new Error('Missing token');
        }
        req.user = { id: (0, helpers_1.verifyToken)(token).id };
        next();
    }
    catch {
        const result = {
            state: false,
            message: messages_1.GENERAL_MESSAGES.UNAUTHORIZED,
        };
        res.status(http_codes_1.HTTP_CODES.UNAUTHORIZED).json(result);
    }
};
exports.authenticateToken = authenticateToken;
/** Returns the authenticated user; use only behind `authenticateToken`. */
const requireUser = (req) => {
    if (!req.user) {
        throw new errors_1.HttpError(http_codes_1.HTTP_CODES.UNAUTHORIZED, messages_1.GENERAL_MESSAGES.UNAUTHORIZED);
    }
    return req.user;
};
exports.requireUser = requireUser;
//# sourceMappingURL=auth.js.map