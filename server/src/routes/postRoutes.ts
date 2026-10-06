import { Router } from 'express';
import {
  addLike,
  addStory,
  createPost,
  fetchPost,
  getFeedPosts,
  getStories,
  removeLike,
  removeStory,
} from '../controllers/post';
import { authenticateToken as protect } from '../middlewares/auth';
import {
  CreatePostSchema,
  PostUuidParamsSchema,
  UuidParamsSchema,
  validate,
} from '../schemas';

const router = Router();

router.use(protect);

router.post('/create', validate('body', CreatePostSchema), createPost);
router.get('/feed', getFeedPosts);
router.get('/stories', getStories);
router.post('/like/:uuid', validate('params', UuidParamsSchema), addLike);
router.post('/unlike/:uuid', validate('params', UuidParamsSchema), removeLike);
router.post(
  '/add-story/:post_uuid',
  validate('params', PostUuidParamsSchema),
  addStory,
);
router.post(
  '/remove-story/:post_uuid',
  validate('params', PostUuidParamsSchema),
  removeStory,
);
router.get('/:uuid', validate('params', UuidParamsSchema), fetchPost);

export default router;
