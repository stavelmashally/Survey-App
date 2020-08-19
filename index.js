const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    // one month expirasion in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
// use cookie session for authentication
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

// Authentication handlers
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
