import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'some_secret');
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
