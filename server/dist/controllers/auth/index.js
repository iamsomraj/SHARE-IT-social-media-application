"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const AuthService_1 = __importDefault(require("../../services/Auth/AuthService"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
/**
 * @description authorizes a user with the given credentials (uuid, token)
 * @route POST /api/v1/auth
 * @access public
 */
const authorizeUser = async (req, res) => {
    const { uuid, token } = req.body;
    await AuthService_1.default.authorize(uuid, token);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        message: messages_1.AUTH_SUCCESS_MESSAGES.AUTHORIZE_SUCCESS,
    });
};
exports.authorizeUser = authorizeUser;
//# sourceMappingURL=index.js.map