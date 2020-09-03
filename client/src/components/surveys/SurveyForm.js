import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => (
      <Field key={field.name} component={SurveyField} type="text" {...field} />
    ));
  }

  render() {
    return (
      <div>
        <h5>Create new survey</h5>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
          style={{ marginTop: '20px' }}
        >
          {this.renderFields()}
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
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm);
