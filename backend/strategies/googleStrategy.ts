import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../db/models/User';
import { generateTokens } from '../utils/generateTokens';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ where: { googleId: profile.id } });
  if (user) {
    const tokens = generateTokens(user);
    return done(null, { ...user, ...tokens });
  }
  const newUser = await User.create({
    googleId: profile.id,
    email: profile.emails?.[0].value,
    refreshToken,
  });
  newUser.save();
  const tokens = generateTokens(newUser);
  done(null, { ...newUser, ...tokens });
}));