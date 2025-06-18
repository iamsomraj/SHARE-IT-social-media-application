import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import AuthService from '@/services/Auth/AuthService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { AUTH_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthInput } from '@/schemas';

/**
 * @description authorize user with given user credentials ( uuid, token)
 * @route POST /api/v1/auth
 * @access public
 */
const authorizeUser = asyncHandler(async (req: Request, res: Response) => {
  const { uuid, token }: AuthInput = req.body;

  const authService = new AuthService();
  const result = await authService.authorize(uuid, token);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: AUTH_SUCCESS_MESSAGES.AUTHORIZE_SUCCESS,
  });
});

export { authorizeUser };
