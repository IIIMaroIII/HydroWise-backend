import { Router } from 'express';

import { authRouter } from './authRouter.js';

export const router = Router();

router.use('/v1/auth', authRouter);
