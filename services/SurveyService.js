const SurveyModel = require('../models/Survey');

module.exports = class SurveyService {
  async createSurvey({ title, subject, body, recipients }, userId) {
    const survey = SurveyModel({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      dateSent: Date.now(),
      _user: userId,
    });

    return survey;
  }

  async save(survey) {
    return await survey.save();
  }
};
