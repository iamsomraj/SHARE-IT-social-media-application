import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @description fetches list of people to show in the explore page
 * @route GET /api/v1/persons/people?page=<___>&limit=<___>
 * @access private
 */
export const getPeople = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { page, limit } = req.query;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const personService = new PersonService();
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const limitNum = limit ? parseInt(limit as string, 10) : 10;
    const result = await personService.getPeople(
      user as any,
      pageNum,
      limitNum,
    );

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.FETCH_PEOPLE_SUCCESS,
    });
  },
);
