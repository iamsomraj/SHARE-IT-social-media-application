import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PersonService from '@/services/Person/PersonService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @description GETS THE LIST OF PEOPLE FOR WHICH SEARCH QUERY IS MATCHED
 * @route POST /api/v1/persons/search
 * @access private
 */
export const search = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { searchQuery } = req.body;
  const { user } = req;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const personService = new PersonService();
  const result = await personService.search(user as any, searchQuery);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.SEARCH_SUCCESS,
  });
});
