"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPerson = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const PersonService_1 = __importDefault(require("@/services/Person/PersonService"));
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
exports.registerPerson = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const personService = new PersonService_1.default();
    const result = await personService.registerPerson(name, email, password);
    res.status(http_codes_1.HTTP_CODES.CREATED).json({
        state: true,
        data: result,
        message: messages_1.PERSON_SUCCESS_MESSAGES.REGISTER_SUCCESS,
    });
});
//# sourceMappingURL=registerPerson.js.map