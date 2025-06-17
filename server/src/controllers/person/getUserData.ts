import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @description FETCHES DETAILS OF THE LOGGED IN USER
 * @route GET /api/v1/persons/
 * @access private
 */
export const getUserData = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const personService = new PersonService();
    const result = await personService.getUserData(user as any);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.FETCH_USER_DATA_SUCCESS,
    });
  },
);
