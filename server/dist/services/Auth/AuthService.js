"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("@/utils/constants/messages");
const RootService_1 = __importDefault(require("@/services/Root/RootService"));
const http_codes_1 = require("@/utils/constants/http-codes");
const PersonsModel_1 = __importDefault(require("@/models/PersonsModel"));
class AuthService extends RootService_1.default {
    constructor() {
        super();
    }
    verifyTokenAndReturnDecoded(req) {
        const authorizationHeader = req?.headers?.authorization || '';
        if (!authorizationHeader) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.NO_AUTHORIZATION_HEADER);
        }
        const startsWithBearer = authorizationHeader.startsWith('Bearer');
        if (!startsWithBearer) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.INVALID_TOKEN_FORMAT);
        }
        const token = authorizationHeader.split(' ')?.[1] || '';
        if (!token) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.INVALID_TOKEN);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.VERIFY_TOKEN_FAILURE);
        }
        return decoded;
    }
    async getUserFromToken(req) {
        const decoded = this.verifyTokenAndReturnDecoded(req);
        const result = await PersonsModel_1.default.checkIfPersonExistsById(decoded.id);
        if (!result) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return result;
    }
    async authorize(uuid, token) {
        if (!uuid || !token) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.INVALID_TOKEN);
        }
        const result = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!result) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        if (result.uuid !== uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.UUID_MISMATCH);
        }
        return;
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map