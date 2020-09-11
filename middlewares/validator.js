const { body, validationResult } = require('express-validator');

const requiredField = field => {
  return body(field, `${field} is required`).not().isEmpty();
};

exports.checkSurvey = () => {
  return [
    requiredField('title'),
    requiredField('subject'),
    requiredField('body'),
    requiredField('recipients'),
  ];
};

exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : next();
};
