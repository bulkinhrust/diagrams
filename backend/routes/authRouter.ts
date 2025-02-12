import express, { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

import userController from '../controllers/userController';
import authMiddleware from '../middleware/AuthMiddleware';
import authController from '../controllers/authController';
import { AuthRequest } from '../types/RouterHandler';
import authService from '../services/authService';
import User from '../db/models/User';
import { mapUserToDto } from '../mappers/mapUserToDto';
import { UserDto } from '../types/UserDto';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/generateTokens';

let refreshTokens: string[] = []; // Временное хранилище refresh-токенов

const cookieOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  path: '/',
  domain: 'localhost',
  sameSite: 'strict',
  secure: false,
};


// const router = Router();
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);
const router = express.Router();

// router.post('/loginWithToken', async (req, res) => {
//   const { code } = req.body;
//     try {
//       console.log('----', code);
//     // Проверяем токен с помощью Google API
//     const { id_token, access_token } = await authService.getGoogleOAuthTokens(code);

//     const googleUser = jwt.decode(id_token) as UserData;
//     const accessToken = generateAccessToken(googleUser);
//     const refreshToken = generateRefreshToken(googleUser);
//     refreshTokens.push(refreshToken);

//     // Ответ пользователю с данными
//       res.cookie('refreshToken', refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//       path: '/',
//       domain: 'localhost',
//       sameSite: 'lax',
//       secure: false,
//     });
//     res.json({ user: googleUser, accessToken });
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// router.get('/sessions/oauth/google', authController.googleOAuthHandler)

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
//   res.json(req.user);
// });

// router.get('/yandex', passport.authenticate('yandex'));
// router.get('/yandex/callback', passport.authenticate('yandex', { session: false }), (req, res) => {
//   res.json(req.user);
// });

// router.get('/currentUser', authMiddleware, authController.currentUser);

router.post('/login', async (req, res) => {
  try {
    const { token } = req.body;
    // Проверяем токен с помощью Google API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: 'Пользователь google не найден' });
    }
    if (!payload.email_verified) {
      return res.status(401).json({ message: 'Адрес электронной почты не верифицирован' });
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
    await user.update({ refreshToken });
      
    res.cookie('refreshToken', refreshToken, cookieOptions);

    // Ответ пользователю с данными
    res.json({ user: userDto, accessToken });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(401).json({ message: 'Токен недействителен' });
  }
});

router.get('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Forbidden' });
  }

  try {
    const userDto = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(userDto?.id);
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    const newAccessToken = generateAccessToken(userDto);
    const newRefreshToken = generateRefreshToken(userDto);

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.json({ token: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

router.get('/currentUser', authMiddleware, async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

// router.get('check', authMiddleware, (req: AuthRequest, res) => {
//   try {
//     const { user } = req;
//     if (!user) {
//       return res.status(404).json({ message: 'Пользователь не найден' });
//     }

//     res.json({ user });
//   } catch (error) {
//     console.error('Ошибка получения пользователя:', error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// })
// router.post('/registration', userController.registration);
// router.post('/login', userController.login);
// router.post('/auth/google', async (req, res) => {
//   const { token } = req.body;
//   try {
//     console.log('----', token)
//     // Проверяем токен с помощью Google API
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID, // Убедитесь, что здесь тот же client_id
//     });

//     const payload = ticket.getPayload();
//     const user = {
//       id: payload?.sub,
//       name: payload?.name,
//       email: payload?.email,
//       picture: payload?.picture,
//     };

//     // Ответ пользователю с данными
//     res.json({ user, token });
//   } catch (error) {
//     console.error('Token verification failed:', error);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });
// // Маршрут для обновления токена
// router.post('/refresh', (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken || !refreshToken.includes(refreshToken)) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   try {
//     const decoded = verifyRefreshToken(refreshToken);

//     const newAccessToken = generateAccessToken(decoded);
//     res.json({ token: newAccessToken });
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });
// router.post('/auth/google/refresh-token', async (req, res) => {
//   const user = new UserRefreshClient(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     req.body.refreshToken,
//   );
//   const { credentials } = await user.refreshAccessToken(); // optain new tokens
//   res.json(credentials);
// })

// router.get('/auth', authMiddleware, userController.check);

export default router;
