import jwt from 'jsonwebtoken';
import { UserDto } from '../types/UserDto';

// Функции для верификации токена

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as UserDto;
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserDto;
};

//Функции для генерации токена

export const generateAccessToken = (user: UserDto) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: UserDto) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });
};
