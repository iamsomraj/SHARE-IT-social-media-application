import PersonsModel from '../../models/PersonsModel';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import {
  AUTH_ERROR_MESSAGES,
  PERSON_ERROR_MESSAGES,
} from '../../utils/constants/messages';
import { HttpError } from '../../utils/errors';
import { verifyToken } from '../../utils/helpers';

/**
 * Handles auth-related business logic.
 */
class AuthService {
  /**
   * Confirms that `token` is valid and belongs to the person with `uuid`.
   * @route POST /api/v1/auth
   */
  async authorize(uuid: string, token: string): Promise<void> {
    let tokenUserId: number;
    try {
      tokenUserId = verifyToken(token).id;
    } catch {
      throw new HttpError(
        HTTP_CODES.UNAUTHORIZED,
        AUTH_ERROR_MESSAGES.VERIFY_TOKEN_FAILURE,
      );
    }

    const person = await PersonsModel.checkIfPersonExistsByUUID(uuid);
    if (!person) {
      throw new HttpError(
        HTTP_CODES.NOT_FOUND,
        PERSON_ERROR_MESSAGES.USER_NOT_FOUND,
      );
    }

    if (person.id !== tokenUserId) {
      throw new HttpError(
        HTTP_CODES.BAD_REQUEST,
        AUTH_ERROR_MESSAGES.UUID_MISMATCH,
      );
    }
  }
}

export default new AuthService();
