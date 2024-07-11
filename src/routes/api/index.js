import { Router } from 'express';

import { authRouter } from './authRouter.js';
import { waterRouter } from './waterRouter.js';

export const router = Router();

router.use('/v1/auth', authRouter);

router.use('/v1/water', waterRouter);