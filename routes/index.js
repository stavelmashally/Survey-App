module.exports = app => {
  require('./authRoutes')(app);
  require('./billingRoutes')(app);
  require('./surveyRoutes')(app);

  return app;
};
