import React, {useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {fetchUser} from '../actions'
import Header from './Header'
import Landing from '../pages/Landing'
import Dashboard from '../pages/Dashboard'
import SurveyNew from '../pages/SurveyNew'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
