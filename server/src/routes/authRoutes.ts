import { Router } from 'express';
import { authorizeUser } from '../controllers/auth';
import { AuthSchema, validate } from '../schemas';

const router = Router();

router.post('/', validate('body', AuthSchema), authorizeUser);

export default router;
