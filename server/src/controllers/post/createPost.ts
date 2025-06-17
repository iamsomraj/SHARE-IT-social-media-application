import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import PostService from '@/services/Post/PostService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';
import { AuthRequest } from '@/types';
import { CreatePostInput } from '@/schemas';

/**
 * @access private
 * @description creates post
 * @route POST /api/v1/posts/create
 */
export const createPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // Data is already validated by Zod middleware
    const { content }: CreatePostInput = req.body;
    const { user } = req;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const postService = new PostService();
    const result = await postService.createPost(user as any, content);

    res.status(HTTP_CODES.CREATED).json({
      state: true,
      data: result,
      message: PERSON_SUCCESS_MESSAGES.POST_SUCCESS,
    });
  },
);
