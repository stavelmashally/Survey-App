const SurveyService = require('../services/SurveyService');
const MailerService = require('../services/MailerService');
const UserService = require('../services/UserService');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

exports.createSurvey = async (req, res, next) => {
  try {
    const userService = new UserService();
    const surveyService = new SurveyService();

    const survey = await surveyService.createSurvey(req.body, req.user.id);

    // Initialize and send the survey emails to recipients
    const mailerService = new MailerService(survey, surveyTemplate(survey));
    await mailerService.send();

    // Storing the survey after the emails has been sent
    await surveyService.save(survey);

    // Substracting the user credits
    const user = await userService.substractCredits(req.user);

    // Respond with the updated user details
    return res.send(user);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.surveyFeedback = async (req, res) => {
  return res.send('Thanks for your feedback!');
};
