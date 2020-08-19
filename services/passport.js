const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// users collection
const User = mongoose.model('users');

// generate cookie to identify the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// identify the user from cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Initialize Google OAuth authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // user is already have a record in the db
          done(null, existingUser);
        } else {
          // create a new user record in the db
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
