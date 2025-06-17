import express from 'express';
import {
  getPersonProfile,
  registerPerson,
  loginPerson,
  followPerson,
  getPeople,
  getUserData,
  unfollowPerson,
  search,
} from '@/controllers/person';
import { authenticateToken as protect } from '@/middlewares/auth';
import {
  validateZodRequest,
  validateZodParams,
  validateZodQuery,
  ZodRegisterSchema,
  ZodLoginSchema,
  ZodUuidParamsSchema,
  ZodSearchQuerySchema,
  ZodPaginationQuerySchema,
} from '@/schemas';

const router = express.Router();

router
  .route('/')
  .post(validateZodRequest(ZodRegisterSchema), registerPerson)
  .get(protect, getUserData);

router.route('/auth').post(validateZodRequest(ZodLoginSchema), loginPerson);

router
  .route('/follow/:uuid')
  .post(protect, validateZodParams(ZodUuidParamsSchema), followPerson);

router
  .route('/unfollow/:uuid')
  .post(protect, validateZodParams(ZodUuidParamsSchema), unfollowPerson);

router
  .route('/people')
  .get(protect, validateZodQuery(ZodPaginationQuerySchema), getPeople);

router
  .route('/:uuid')
  .get(protect, validateZodParams(ZodUuidParamsSchema), getPersonProfile);

router
  .route('/search/')
  .post(protect, validateZodRequest(ZodSearchQuerySchema), search);

export default router;
