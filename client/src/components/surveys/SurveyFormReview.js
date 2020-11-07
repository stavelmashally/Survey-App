import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {submitSurvey} from '../../actions'
import formFields from './formFields'

const SurveyFormReview = ({onCancel, history}) => {
  const formValues = useSelector(({form}) => form.surveyForm.values)
  const dispatch = useDispatch()

  const reviewFields = formFields.map(({label, name}) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ))

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <div style={{marginTop: '20px'}}>
        <button className="red btn-flat white-text" onClick={onCancel}>
          Back
        </button>
        <button
          onClick={() => dispatch(submitSurvey(formValues, history))}
          className="teal btn-flat right white-text"
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  )
}

export default withRouter(SurveyFormReview)
