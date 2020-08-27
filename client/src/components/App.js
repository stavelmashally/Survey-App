import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
