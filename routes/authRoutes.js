const passport = require('passport');
const { authCtrl } = require('../controllers');

module.exports = app => {
  app.get('/api/current_user', authCtrl.currentUser);
  app.get('/api/logout', authCtrl.logOut);
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    authCtrl.googleCallback
  );
};
