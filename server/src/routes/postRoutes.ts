import express from 'express';
import {
  addLike,
  createPost,
  getFeedPosts,
  removeLike,
  fetchPost,
  addStory,
  removeStory,
  getStories,
} from '@/controllers/post';
import { authenticateToken as protect } from '@/middlewares/auth';
import {
  validateZodRequest,
  validateZodParams,
  ZodCreatePostSchema,
  ZodUuidParamsSchema,
  ZodPostUuidParamsSchema,
} from '@/schemas';

const router = express.Router();

router
  .route('/create')
  .post(protect, validateZodRequest(ZodCreatePostSchema), createPost);

router.route('/feed').get(protect, getFeedPosts);

router.route('/stories').get(protect, getStories);

router
  .route('/like/:uuid')
  .post(protect, validateZodParams(ZodUuidParamsSchema), addLike);

router
  .route('/unlike/:uuid')
  .post(protect, validateZodParams(ZodUuidParamsSchema), removeLike);

router
  .route('/add-story/:post_uuid')
  .post(protect, validateZodParams(ZodPostUuidParamsSchema), addStory);

router
  .route('/remove-story/:post_uuid')
  .post(protect, validateZodParams(ZodPostUuidParamsSchema), removeStory);

router
  .route('/:uuid')
  .get(protect, validateZodParams(ZodUuidParamsSchema), fetchPost);

export default router;
