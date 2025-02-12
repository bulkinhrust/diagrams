import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/RouterHandler';
import { verifyAccessToken } from '../utils/generateTokens';
import User from '../db/models/User';
const { OAuth2Client } = require('google-auth-library');

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    const userDto = verifyAccessToken(token);
    const user = await User.findByPk(userDto?.id);
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user;
    next(); // Передаём управление дальше
  } catch (error) {
    res.status(401).json({ message: 'Неверный или истекший токен' });
  }
};

export default authMiddleware;
