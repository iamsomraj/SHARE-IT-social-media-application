"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonsModel_1 = __importDefault(require("../../models/PersonsModel"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
/**
 * Handles auth-related business logic.
 */
class AuthService {
    /**
     * Confirms that `token` is valid and belongs to the person with `uuid`.
     * @route POST /api/v1/auth
     */
    async authorize(uuid, token) {
        let tokenUserId;
        try {
            tokenUserId = (0, helpers_1.verifyToken)(token).id;
        }
        catch {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.UNAUTHORIZED, messages_1.AUTH_ERROR_MESSAGES.VERIFY_TOKEN_FAILURE);
        }
        const person = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!person) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        if (person.id !== tokenUserId) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.AUTH_ERROR_MESSAGES.UUID_MISMATCH);
        }
    }
}
exports.default = new AuthService();
//# sourceMappingURL=AuthService.js.map