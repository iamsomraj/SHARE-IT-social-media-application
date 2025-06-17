import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @description FOLLOWS A PERSON
 * @route POST /api/v1/persons/follow/:uuid
 * @access private
 */
export const followPerson = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { uuid } = req.params as { uuid: string };
    const { user } = req;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const personService = new PersonService();
    const result = await personService.followPerson(user as any, uuid);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.FOLLOW_SUCCESS,
    });
  },
);
