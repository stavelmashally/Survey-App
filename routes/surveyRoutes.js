const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const { surveyCtrl } = require('../controllers');
const { checkSurvey, isValidated } = require('../middlewares/validator');

module.exports = app => {
  app.get('/api/surveys', requireLogin, surveyCtrl.getSurveys);

  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    checkSurvey(),
    isValidated,
    surveyCtrl.createSurvey
  );

  app.post('/api/surveys/webhook', surveyCtrl.updateSurveys);

  app.get('/api/surveys/:surveyId/:choice', surveyCtrl.surveyFeedback);
};
