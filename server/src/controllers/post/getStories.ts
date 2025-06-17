import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PostService from '@/services/Post/PostService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @access private
 * @description gets all the stories for the user
 * @route GET /api/v1/posts/stories
 */
export const getStories = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const postService = new PostService();
    const result = await postService.getStories(user as any);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.PERSON_FAVOURTIE_SUCCESS,
    });
  },
);
