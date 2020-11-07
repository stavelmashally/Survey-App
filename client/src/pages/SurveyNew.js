import React, {useState} from 'react'
import {reduxForm} from 'redux-form'
import SurveyForm from '../components/surveys/SurveyForm'
import SurveyFormReview from '../components/surveys/SurveyFormReview'

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false)

  return (
    <div className="card-panel">
      {showFormReview ? (
        <SurveyFormReview onCancel={() => setShowFormReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
      )}
    </div>
  )
}

export default reduxForm({form: 'surveyForm'})(SurveyNew)
