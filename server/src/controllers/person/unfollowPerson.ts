import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @description UNFOLLOWS A PERSON
 * @route POST /api/v1/persons/unfollow/:uuid
 * @access private
 */
export const unfollowPerson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { uuid } = req.params;
    const { user } = req;

    if (!uuid) {
      throw new Error('UUID parameter is required');
    }
    if (!user) {
      throw new Error('User not authenticated');
    }

    const personService = new PersonService();
    const result = await personService.unfollowPerson(user as any, uuid);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
    });
  },
);
