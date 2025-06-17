import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import PostService from '@/services/Post/PostService';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '@/utils/constants/messages';

/**
 * @access private
 * @description fetches post details with the given uuid of the post
 * @route GET /api/v1/posts/:uuid
 */
export const fetchPost = asyncHandler(async (req: Request, res: Response) => {
  const { uuid } = req.params;

  if (!uuid) {
    throw new Error('UUID parameter is required');
  }

  const postService = new PostService();
  const result = await postService.fetchPost(uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data: result,
    message: PERSON_SUCCESS_MESSAGES.FETCH_POST_SUCCESS,
  });
});
