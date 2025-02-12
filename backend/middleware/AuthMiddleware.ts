import { NextFunction, Response } from 'express';
import { AuthRequest } from '../types/RouterHandler';
import { verifyAccessToken } from '../utils/generateTokens';
import User from '../db/models/User';

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
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный или истекший токен' });
  }
};

export default authMiddleware;
