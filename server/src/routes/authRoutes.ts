import express from 'express';
import { authorizeUser } from '@/controllers/auth';
import { validateZodRequest, ZodAuthSchema } from '@/schemas';

const router = express.Router();

router.route('/').post(validateZodRequest(ZodAuthSchema), authorizeUser);

export default router;
