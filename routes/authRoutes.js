const passport = require('passport');

module.exports = app => {
  // Google Authentication handler
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // Get the user details from Google
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // remove the cookie
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
