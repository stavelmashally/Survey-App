const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const { surveyCtrl } = require('../controllers');

module.exports = app => {
  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    surveyCtrl.createSurvey
  );

  app.get('/api/surveys/feedback', surveyCtrl.surveyFeedback);
};
