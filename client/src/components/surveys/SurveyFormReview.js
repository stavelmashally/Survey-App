import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitSurvey } from '../../actions';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <div style={{ marginTop: '20px' }}>
        <button className="red btn-flat white-text" onClick={onCancel}>
          Back
        </button>
        <button
          onClick={() => submitSurvey(formValues, history)}
          className="teal btn-flat right white-text"
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ formValues: state.form.surveyForm.values });

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(SurveyFormReview)
);
