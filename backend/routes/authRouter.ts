import express from 'express';

import authController from '../controllers/authController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/login', authController.login);

router.get('/refresh', authController.refresh);

router.get('/currentUser', authMiddleware, authController.currentUser);

export default router;
