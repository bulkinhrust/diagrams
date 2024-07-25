import { Router } from 'express';

import diagramRouter from './diagramRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/diagram', diagramRouter);
router.use('/user', userRouter);

export default router;
