import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { LoginInput } from '@/schemas';

/**
 * @access public
 * @description logins one person
 * @route POST /api/v1/persons/auth
 * @access public
 */
export const loginPerson = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: LoginInput = req.body;

  const personService = new PersonService();
  const result = await personService.loginPerson(email, password);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.LOGIN_SUCCESS,
  });
});
