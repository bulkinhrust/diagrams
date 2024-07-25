import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '../error/ApiError';
import User from '../db/models/User';
import { RouterHandler } from '../types/RouterHandler';

interface IUserController {
  registration: RouterHandler<{ token: string } | void>;
  login: RouterHandler<{ token: string } | void>;
  check: RouterHandler<string>;
}

const generateJwt = (id: string | number, email: string, role: string) => (
  jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY || 'some_secret',
    { expiresIn: '24h' },
  )
);

class UserController implements IUserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password, role = 'USER' } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'));
    }

    const candidate: User | null = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req: Request, res: Response, next: NextFunction) {
    if (!req.body.user) {
      return next(ApiError.internal('неопознанный пользователь'));
    }
    const user = req.body.user as User;
    const token = generateJwt(user.id, user.email, user.role);

    return res.json({ token });
  }
}

export default new UserController();
