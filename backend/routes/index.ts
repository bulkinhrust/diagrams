import { Router } from 'express';

import diagramRouter from './diagramRouter';
import authRouter from './authRouter';

const router = Router();

router.use('/diagram', diagramRouter);
router.use('/auth', authRouter);

export default router;
