import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

const renderSurveys = surveys => {
  return surveys.reverse().map(survey => (
    <div className="card darken-1" key={survey._id}>
      <div className="card-content">
        <span className="card-title">{survey.title}</span>
        <p>{survey.body}</p>
        <p className="right">
          Sent On: {new Date(survey.dateSent).toLocaleDateString()}
        </p>
      </div>
      <div className="card-action">
        <a className="teal-text">Yes: {survey.yes}</a>
        <a className="teal-text"> No: {survey.no}</a>
      </div>
    </div>
  ));
};

const SurveyList = ({ surveys, fetchSurveys }) => {
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  return <div>{renderSurveys(surveys)}</div>;
};

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
