"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = exports.optionalAuth = exports.authenticateToken = void 0;
const helpers_1 = require("@/utils/helpers");
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
const BEARER_PREFIX = 'Bearer ';
const createUnauthorizedResponse = () => ({
    state: false,
    message: messages_1.GENERAL_MESSAGES.UNAUTHORIZED,
});
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader?.startsWith(BEARER_PREFIX)) {
        return null;
    }
    return authHeader.slice(BEARER_PREFIX.length);
};
const authenticateToken = (req, res, next) => {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (!token) {
        res.status(http_codes_1.HTTP_CODES.UNAUTHORIZED).json(createUnauthorizedResponse());
        return;
    }
    try {
        const decoded = (0, helpers_1.verifyToken)(token);
        req.user = {
            id: decoded.id,
            uuid: '',
            name: '',
            email: '',
        };
        next();
    }
    catch {
        res.status(http_codes_1.HTTP_CODES.UNAUTHORIZED).json(createUnauthorizedResponse());
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = (req, _res, next) => {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (token) {
        try {
            const decoded = (0, helpers_1.verifyToken)(token);
            req.user = {
                id: decoded.id,
                uuid: '',
                name: '',
                email: '',
            };
        }
        catch {
        }
    }
    next();
};
exports.optionalAuth = optionalAuth;
const requestCounts = new Map();
const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    return (req, res, next) => {
        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();
        for (const [key, value] of requestCounts.entries()) {
            if (now > value.resetTime) {
                requestCounts.delete(key);
            }
        }
        const current = requestCounts.get(ip);
        if (!current) {
            requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
            next();
            return;
        }
        if (now > current.resetTime) {
            requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
            next();
            return;
        }
        if (current.count >= maxRequests) {
            const result = {
                state: false,
                message: 'Too many requests, please try again later',
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(result);
            return;
        }
        current.count++;
        next();
    };
};
exports.rateLimit = rateLimit;
//# sourceMappingURL=auth.js.map