import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PostService from '@/services/Post/PostService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';

/**
 * @access private
 * @description marks a post as story for a given user
 * @route POST /api/v1/posts/story/:post_uuid
 */
export const addStory = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { post_uuid } = req.params;
    const { user } = req;

    if (!post_uuid) {
      throw new Error('Post UUID parameter is required');
    }
    if (!user) {
      throw new Error('User not authenticated');
    }

    const postService = new PostService();
    const result = await postService.addStory(user as any, post_uuid);

    res.status(HTTP_CODES.CREATED).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.STORY_SUCCESS,
    });
  },
);
