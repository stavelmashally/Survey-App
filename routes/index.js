module.exports = app => {
  require('./authRoutes')(app);
  require('./billingRoutes')(app);

  return app;
};
