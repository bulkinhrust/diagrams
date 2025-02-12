import { NextFunction, Request, Response } from 'express';
import { AuthRequest, AuthRouterHandler } from '../types/RouterHandler';
import User from '../db/models/User';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';

interface IAuthController {
  currentUser: AuthRouterHandler<User | null>;
}

type UserData = {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
};

class AuthController implements IAuthController {
  async login() {

  };
  
  async googleOAuthHandler(req: Request, res: Response) {
    try {
      // get the code from qs
      const code = req.query.code as string;

      // get the id and access token with the code
      const { id_token, access_token } = await authService.getGoogleOAuthTokens(code);

      // get user with tokens
      const googleUser = jwt.decode(id_token) as UserData;
      console.log('======', { googleUser });

      if (!googleUser?.email_verified) {
        return res.status(403).send('Google account is not verified');
      }

      const user = await this.findOrCreateUser(googleUser);

      // upsert the user

      // create a session

      // create access & refresh tokens
      const accessToken = jwt.sign(user.toJSON(), 'secret', { expiresIn: '15m' });
      const refreshToken = jwt.sign(user.toJSON(), 'secret', { expiresIn: '90d' });

      // set cookies 
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        sameSite: 'lax',
        secure: false,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        sameSite: 'lax',
        secure: false,
      });

      // redirect back to client
      res.redirect(process.env.ORIGIN_URL as string);
    } catch (error) {
      return res.redirect(process.env.ORIGIN_URL as string)
    }
    
  };

  async findOrCreateUser({ email, picture, name }: UserData) {
    let user: User | null = null;
    user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ email, picture, name });
    }

    return user;
  }
  
  async currentUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const user = res.locals.user;
  };

  async loginWithToken(req: Request, res: Response) {
    
  }
}

export default new AuthController();