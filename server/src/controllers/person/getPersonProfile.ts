import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';

/**
 * @description FETCHES DETAILS OF THE PERSON WITH THE GIVEN UUID
 * @route GET /api/v1/persons/:uuid
 * @access private
 */
export const getPersonProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { uuid } = req.params;
    if (!uuid) {
      throw new Error('UUID parameter is required');
    }

    const personService = new PersonService();
    const result = await personService.getPersonProfile(uuid);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.FETCH_PERSON_PROFILE_SUCCESS,
    });
  },
);
