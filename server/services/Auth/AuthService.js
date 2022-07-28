const { AUTH_ERROR_MESSAGES, PERSON_ERROR_MESSAGES } = require("../../utils/constants/messages");
const RootService = require("../Root/RootService");
const jwt = require("jsonwebtoken");
const Person = require("../../models/Person");
const HTTP_CODES = require("../../utils/constants/http-codes");

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL AUTH RELATED CONTROLLERS, INCLUDING AUTH MIDDLEWARE
 */
class AuthService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description CHECKS FOR TOKEN IN THE HEADER AND RETURNS DECODED TOKEN INFORMATION
   * @param {{ headers: { authorization: string }}} req
   */
  verifyTokenAndReturnDecoded(req) {
    const authorizationHeader = req?.headers?.authorization || "";

    /* CHECKS IF AUTHORIZATION HEADER IS PROVIDED OR NOT */
    if (!authorizationHeader) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, AUTH_ERROR_MESSAGES.NO_AUTHORIZATION_HEADER);
    }

    const startsWithBearer = authorizationHeader.startsWith("Bearer");
    /* CHECKS IF TOKEN FORMAT IS CORRECT OR NOT */
    if (!startsWithBearer) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, AUTH_ERROR_MESSAGES.INVALID_TOKEN_FORMAT);
    }

    const token = authorizationHeader.split(" ")?.[1] || "";
    /* CHECKS IF TOKEN IS PROVIDED OR NOT */
    if (!token) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, AUTH_ERROR_MESSAGES.INVALID_TOKEN);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /* CHECKS IF VERIFICATION IS SUCCESSFUL OR NOT */
    if (!decoded || !decoded.id) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, AUTH_ERROR_MESSAGES.VERIFY_TOKEN_FAILURE);
    }

    return decoded;
  }

  /**
   * @description CHECKS IF THE TOKEN IS PRESENT AND VERIFIES THE VALIDITY OF IT
   * @param {{ headers: { authorization: string }}} req
   */
  async getUserFromToken(req) {
    const decoded = this.verifyTokenAndReturnDecoded(req);
    const result = await Person.query().findOne({ id: parseInt(decoded.id) });
    if (!result) {
      this.raiseError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return result;
  }
}

module.exports = AuthService;
