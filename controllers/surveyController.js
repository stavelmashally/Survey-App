const SurveyService = require('../services/SurveyService');

const surveyService = new SurveyService();

exports.getSurveys = async (req, res) => {
  const surveys = await surveyService.getUserSurveys(req.user.id);

  return res.send(surveys);
};

exports.createSurvey = async (req, res) => {
  try {
    const updatedUser = await surveyService.createAndSendSurvey(
      req.body,
      req.user
    );
    // Respond with the updated user
    return res.send(updatedUser);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.updateSurveys = async (req, res) => {
  surveyService.updateSurveys(req.body);

  // Sendgrid doesnt expects a response
  return res.send({});
};

exports.surveyFeedback = async (req, res) => {
  return res.send('Thanks for your feedback!');
};
