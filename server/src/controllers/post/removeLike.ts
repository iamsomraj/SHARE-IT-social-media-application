import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PostService from '@/services/Post/PostService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @access private
 * @description removes like for post
 * @route POST /api/v1/posts/unlike/:uuid
 */
export const removeLike = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { uuid } = req.params;
    const { user } = req;

    if (!uuid) {
      throw new Error('UUID parameter is required');
    }
    if (!user) {
      throw new Error('User not authenticated');
    }

    const postService = new PostService();
    const result = await postService.removeLike(user as any, uuid);

    res.status(HTTP_CODES.OK).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.UNLIKE_SUCCESS,
    });
  },
);
