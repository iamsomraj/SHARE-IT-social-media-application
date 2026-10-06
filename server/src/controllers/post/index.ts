import type { Request, Response } from 'express';
import { requireUser } from '../../middlewares/auth';
import type {
  CreatePostInput,
  PostUuidParams,
  UuidParams,
} from '../../schemas';
import PostService from '../../services/Post/PostService';
import { HTTP_CODES } from '../../utils/constants/http-codes';
import { PERSON_SUCCESS_MESSAGES } from '../../utils/constants/messages';

/**
 * @description creates a post
 * @route POST /api/v1/posts/create
 * @access private
 */
export const createPost = async (
  req: Request<Record<string, string>, unknown, CreatePostInput>,
  res: Response,
): Promise<void> => {
  const data = await PostService.createPost(requireUser(req), req.body.content);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.POST_SUCCESS,
  });
};

/**
 * @description gets the feed for the user
 * @route GET /api/v1/posts/feed
 * @access private
 */
export const getFeedPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = await PostService.getFeedPosts(requireUser(req));

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.PERSON_FEED_SUCCESS,
  });
};

/**
 * @description gets the stories of the user
 * @route GET /api/v1/posts/stories
 * @access private
 */
export const getStories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const data = await PostService.getStories(requireUser(req));

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.PERSON_FAVOURTIE_SUCCESS,
  });
};

/**
 * @description fetches a post by uuid
 * @route GET /api/v1/posts/:uuid
 * @access private
 */
export const fetchPost = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PostService.fetchPost(req.params.uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.FETCH_POST_SUCCESS,
  });
};

/**
 * @description likes a post
 * @route POST /api/v1/posts/like/:uuid
 * @access private
 */
export const addLike = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PostService.addLike(requireUser(req), req.params.uuid);

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.LIKE_SUCCESS,
  });
};

/**
 * @description removes a like from a post
 * @route POST /api/v1/posts/unlike/:uuid
 * @access private
 */
export const removeLike = async (
  req: Request<UuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PostService.removeLike(requireUser(req), req.params.uuid);

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.UNLIKE_SUCCESS,
  });
};

/**
 * @description adds a post to the user's story
 * @route POST /api/v1/posts/add-story/:post_uuid
 * @access private
 */
export const addStory = async (
  req: Request<PostUuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PostService.addStory(
    requireUser(req),
    req.params.post_uuid,
  );

  res.status(HTTP_CODES.CREATED).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.STORY_SUCCESS,
  });
};

/**
 * @description removes a post from the user's story
 * @route POST /api/v1/posts/remove-story/:post_uuid
 * @access private
 */
export const removeStory = async (
  req: Request<PostUuidParams>,
  res: Response,
): Promise<void> => {
  const data = await PostService.removeStory(
    requireUser(req),
    req.params.post_uuid,
  );

  res.status(HTTP_CODES.OK).json({
    state: true,
    data,
    message: PERSON_SUCCESS_MESSAGES.UNSTORY_SUCCESS,
  });
};
