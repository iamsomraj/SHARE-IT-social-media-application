"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getPeople = exports.unfollowPerson = exports.followPerson = exports.getPersonProfile = exports.getUserData = exports.loginPerson = exports.registerPerson = void 0;
const auth_1 = require("../../middlewares/auth");
const PersonService_1 = __importDefault(require("../../services/Person/PersonService"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
/**
 * @description registers a person
 * @route POST /api/v1/persons/
 * @access public
 */
const registerPerson = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await PersonService_1.default.registerPerson(name, email, password);
    res.status(http_codes_1.HTTP_CODES.CREATED).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.REGISTER_SUCCESS,
    });
};
exports.registerPerson = registerPerson;
/**
 * @description logs a person in
 * @route POST /api/v1/persons/auth
 * @access public
 */
const loginPerson = async (req, res) => {
    const { email, password } = req.body;
    const data = await PersonService_1.default.loginPerson(email, password);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.LOGIN_SUCCESS,
    });
};
exports.loginPerson = loginPerson;
/**
 * @description fetches details of the logged in user
 * @route GET /api/v1/persons/
 * @access private
 */
const getUserData = async (req, res) => {
    const data = await PersonService_1.default.getUserData((0, auth_1.requireUser)(req));
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.FETCH_USER_DATA_SUCCESS,
    });
};
exports.getUserData = getUserData;
/**
 * @description fetches details of the person with the given uuid
 * @route GET /api/v1/persons/:uuid
 * @access private
 */
const getPersonProfile = async (req, res) => {
    const data = await PersonService_1.default.getPersonProfile(req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.FETCH_PERSON_PROFILE_SUCCESS,
    });
};
exports.getPersonProfile = getPersonProfile;
/**
 * @description follows a person
 * @route POST /api/v1/persons/follow/:uuid
 * @access private
 */
const followPerson = async (req, res) => {
    const data = await PersonService_1.default.followPerson((0, auth_1.requireUser)(req), req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
    });
};
exports.followPerson = followPerson;
/**
 * @description unfollows a person
 * @route POST /api/v1/persons/unfollow/:uuid
 * @access private
 */
const unfollowPerson = async (req, res) => {
    const data = await PersonService_1.default.unfollowPerson((0, auth_1.requireUser)(req), req.params.uuid);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.UNFOLLOW_SUCCESS,
    });
};
exports.unfollowPerson = unfollowPerson;
/**
 * @description fetches people to show on the explore page
 * @route GET /api/v1/persons/people?page=<n>&limit=<n>
 * @access private
 */
const getPeople = async (req, res) => {
    // `req.query` has been replaced with the parsed value by `validate('query', ...)`.
    const { page, limit } = req.query;
    const data = await PersonService_1.default.getPeople((0, auth_1.requireUser)(req), page, limit);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.FETCH_PEOPLE_SUCCESS,
    });
};
exports.getPeople = getPeople;
/**
 * @description searches people by name or email
 * @route POST /api/v1/persons/search
 * @access private
 */
const search = async (req, res) => {
    const data = await PersonService_1.default.search((0, auth_1.requireUser)(req), req.body.searchQuery);
    res.status(http_codes_1.HTTP_CODES.OK).json({
        state: true,
        data,
        message: messages_1.PERSON_SUCCESS_MESSAGES.SEARCH_SUCCESS,
    });
};
exports.search = search;
//# sourceMappingURL=index.js.map