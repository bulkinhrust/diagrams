import { Router } from 'express';

import diagramRouter from './diagramRouter';
import authRouter from './authRouter';

const router = Router();

console.log('+++++++++++', process.env.REFRESH_TOKEN_SECRET);

router.use('/diagram', diagramRouter);
router.use('/auth', authRouter);

export default router;
