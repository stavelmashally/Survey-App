const _ = require('lodash');
const { URL } = require('url');
const { Path } = require('path-parser');

const UserService = require('../services/UserService');
const SurveyModel = require('../models/Survey');
const MailerService = require('../services/MailerService');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
module.exports = class SurveyService {
  async getUserSurveys(userId) {
    // Exclude the recipients list
    const surveys = await SurveyModel.find({ _user: userId }).select({
      recipients: false,
    });
    return surveys;
  }

  async createAndSendSurvey({ title, subject, body, recipients }, user) {
    const survey = await SurveyModel({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      dateSent: Date.now(),
      _user: user.id,
    });

    // Initialize and send the survey emails to recipients
    const mailerService = new MailerService(survey, surveyTemplate(survey));
    await mailerService.send();

    // Storing the survey after the emails has been sent
    await survey.save();

    const userService = new UserService();
    // Substracting the user credits
    const updatedUser = await userService.substractCredits(user);

    return updatedUser;
  }

  // Updating surveys from click events
  updateSurveys(events) {
    const path = new Path('/api/surveys/:surveyId/:choice');

    return (
      _.chain(events)
        .map(({ email, url }) => {
          const match = path.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        })
        .compact()
        // Delete duplicates
        .uniqBy('email', 'surveyId')
        // Update the survey
        .each(({ surveyId, email, choice }) => {
          SurveyModel.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email, responded: false },
              },
            },
            {
              $inc: { [choice]: 1 },
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date(),
            }
          ).exec();
        })
        .value()
    );
  }
};
