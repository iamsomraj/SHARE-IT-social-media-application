import { Router } from 'express';
import {
  followPerson,
  getPeople,
  getPersonProfile,
  getUserData,
  loginPerson,
  registerPerson,
  search,
  unfollowPerson,
} from '../controllers/person';
import { authenticateToken as protect } from '../middlewares/auth';
import {
  LoginSchema,
  PaginationQuerySchema,
  RegisterSchema,
  SearchSchema,
  UuidParamsSchema,
  validate,
} from '../schemas';

const router = Router();

router
  .route('/')
  .post(validate('body', RegisterSchema), registerPerson)
  .get(protect, getUserData);

router.post('/auth', validate('body', LoginSchema), loginPerson);

router.post(
  '/follow/:uuid',
  protect,
  validate('params', UuidParamsSchema),
  followPerson,
);

router.post(
  '/unfollow/:uuid',
  protect,
  validate('params', UuidParamsSchema),
  unfollowPerson,
);

router.get(
  '/people',
  protect,
  validate('query', PaginationQuerySchema),
  getPeople,
);

router.post('/search', protect, validate('body', SearchSchema), search);

router.get(
  '/:uuid',
  protect,
  validate('params', UuidParamsSchema),
  getPersonProfile,
);

export default router;
