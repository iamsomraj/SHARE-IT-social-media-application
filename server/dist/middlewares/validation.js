"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateRequest = void 0;
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const result = {
                state: false,
                message: error.details[0]?.message || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(result);
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.query);
        if (error) {
            const result = {
                state: false,
                message: error.details[0]?.message || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(result);
            return;
        }
        next();
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            const result = {
                state: false,
                message: error.details[0]?.message || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(result);
            return;
        }
        next();
    };
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.js.map