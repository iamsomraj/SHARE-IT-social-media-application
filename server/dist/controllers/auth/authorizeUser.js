"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AuthService_1 = __importDefault(require("@/services/Auth/AuthService"));
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
const authorizeUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { uuid, token } = req.body;
    const authService = new AuthService_1.default();
    const result = await authService.authorize(uuid, token);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data: result,
        message: messages_1.AUTH_SUCCESS_MESSAGES.AUTHORIZE_SUCCESS,
    });
});
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=authorizeUser.js.map