import { Request } from 'express';
import jwt from 'jsonwebtoken';
import {
  AUTH_ERROR_MESSAGES,
  PERSON_ERROR_MESSAGES,
} from '@/utils/constants/messages';
import RootService from '@/services/Root/RootService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { TokenPayload } from '@/types';
import PersonsModel from '@/models/PersonsModel';

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL AUTH RELATED CONTROLLERS, INCLUDING AUTH MIDDLEWARE
 */
class AuthService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description CHECKS FOR TOKEN IN THE HEADER AND RETURNS DECODED TOKEN INFORMATION
   * @param req - Express request object
   */
  verifyTokenAndReturnDecoded(req: Request): TokenPayload {
    const authorizationHeader = req?.headers?.authorization || '';

    /* CHECKS IF AUTHORIZATION HEADER IS PROVIDED OR NOT */
    if (!authorizationHeader) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.NO_AUTHORIZATION_HEADER,
      );
    }

    const startsWithBearer = authorizationHeader.startsWith('Bearer');
    /* CHECKS IF TOKEN FORMAT IS CORRECT OR NOT */
    if (!startsWithBearer) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.INVALID_TOKEN_FORMAT,
      );
    }

    const token = authorizationHeader.split(' ')?.[1] || '';
    /* CHECKS IF TOKEN IS PROVIDED OR NOT */
    if (!token) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.INVALID_TOKEN,
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    /* CHECKS IF VERIFICATION IS SUCCESSFUL OR NOT */
    if (!decoded || !decoded.id) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.VERIFY_TOKEN_FAILURE,
      );
    }

    return decoded;
  }

  /**
   * @description CHECKS IF THE TOKEN IS PRESENT AND VERIFIES THE VALIDITY OF IT
   * @param req - Express request object
   */
  async getUserFromToken(req: Request): Promise<PersonsModel> {
    const decoded = this.verifyTokenAndReturnDecoded(req);
    const result = await PersonsModel.checkIfPersonExistsById(decoded.id);
    if (!result) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }
    return result;
  }

  /**
   * @description AUTHORIZES THE USER WITH GIVEN CREDENTIALS
   * @param uuid - User UUID
   * @param token - Auth token
   * @route POST /api/v1/auth
   * @access public
   */
  async authorize(uuid: string, token: string): Promise<void> {
    if (!uuid || !token) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.INVALID_TOKEN,
      );
    }
    const result = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!result) {
      this.raiseError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }
    if (result.uuid !== uuid) {
      this.raiseError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.UUID_MISMATCH,
      );
    }
    return;
  }
}

export default AuthService;
