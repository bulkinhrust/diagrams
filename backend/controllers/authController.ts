import { OAuth2Client } from 'google-auth-library';
import { CookieOptions, NextFunction, Request, Response } from 'express';

import User from '../db/models/User';
import ApiError from '../error/ApiError';
import { mapUserToDto } from '../mappers/mapUserToDto';
import { AuthRequest } from '../types/RouterHandler';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/generateTokens';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  path: '/',
  domain: 'localhost',
  sameSite: 'strict',
  secure: false,
};

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      // Проверяем токен с помощью Google API
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      if (!payload) {
        throw ApiError.unauthorized('Пользователь google не найден');
      }
      if (!payload.email_verified) {
        throw ApiError.unauthorized('Адрес электронной почты не верифицирован');
      }
      const { email, name, picture, sub } = payload;
        
      // Проверяем есть ли юзер в базе. Если нет, то создаем его.
      let user = await User.findOne({
        where: { email, googleId: sub },
      });
      if (!user) {
        user = await User.create({
          email,
          googleId: sub,
          name,
          picture,
        });
      }
      const userDto = mapUserToDto(user);
      const accessToken = generateAccessToken(userDto);
      const refreshToken = generateRefreshToken(userDto);
        
      // Ответ пользователю с данными
      res.cookie('refreshToken', refreshToken, cookieOptions);
      res.json({ user: userDto, accessToken });
    } catch (error) {
      next(error);
    }
  };
  
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
    
      if (!refreshToken) {
        throw new ApiError(400, 'Ошибка токена');
      }
      const userDto = verifyRefreshToken(refreshToken);

      const user = await User.findByPk(userDto?.id);
      if (!user) {
        throw new ApiError(400, 'Пользователь не найден');
      }
  
      const newAccessToken = generateAccessToken(mapUserToDto(user));
  
      res.json({ token: newAccessToken });
    } catch (error) {
      next(error);
    }
  }

  async currentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json(mapUserToDto(req.user));
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken');

      res.json({ message: 'Вы успешно вышли' });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();