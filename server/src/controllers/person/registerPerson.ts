import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { RegisterInput } from '@/schemas';

/**
 * @access public
 * @description registers one person
 * @route POST /api/v1/persons/
 * @access public
 */
export const registerPerson = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password }: RegisterInput = req.body;

    const personService = new PersonService();
    const result = await personService.registerPerson(name, email, password);

    res.status(HTTP_CODES.CREATED).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.REGISTER_SUCCESS,
    });
  },
);
