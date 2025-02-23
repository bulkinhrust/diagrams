import express from 'express';

import authController from '../controllers/authController';
import authMiddleware from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/google-login', authController.googleLogin);

router.get('/refresh', authController.refresh);

router.get('/currentUser', authMiddleware, authController.currentUser);

router.get('/logout', authController.logout);

export default router;
