import type { Request, Response } from 'express';
import type { AuthInput } from '../../schemas';
import AuthService from '../../services/Auth/AuthService';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import { AUTH_SUCCESS_MESSAGES } from '../../utils/constants/messages';

/**
 * @description authorizes a user with the given credentials (uuid, token)
 * @route POST /api/v1/auth
 * @access public
 */
export const authorizeUser = async (
  req: Request<Record<string, string>, unknown, AuthInput>,
  res: Response,
): Promise<void> => {
  const { uuid, token } = req.body;
  await AuthService.authorize(uuid, token);

  res.status(HTTP_CODES.OK).json({
    state: true,
    message: AUTH_SUCCESS_MESSAGES.AUTHORIZE_SUCCESS,
  });
};
