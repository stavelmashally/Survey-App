const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const UserModel = require('../models/User');
const UserService = require('./UserService');

const userService = new UserService(UserModel);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.find({ _id: id });
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await userService.find({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await userService.createAndSave({ googleId: profile.id });

      done(null, user);
    }
  )
);
