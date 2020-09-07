import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';
import formFields from './formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const surveyFormFields = formFields.map(({ name, label }) => (
    <Field
      key={name}
      type="text"
      name={name}
      label={label}
      component={SurveyField}
    />
  ));

  return (
    <div>
      <h5>Create new survey</h5>
      <form
        onSubmit={handleSubmit(onSurveySubmit)}
        style={{ marginTop: '20px' }}
      >
        {surveyFormFields}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
