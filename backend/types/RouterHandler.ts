import { NextFunction, Request, Response } from 'express';
import User from '../db/models/User';

export interface AuthRequest extends Request {
  user: User;
};

export type AuthRouterHandler<T> = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response<T>>;

export type RouterHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<T>>;
