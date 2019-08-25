import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import history from './history';
import axios from 'axios';


import NavBar from './navbar/nav-bar';
import { EventsList, CreateEvent, EventDetails, CreateSession } from './event';
import UserList from './user/user-list';
import Error404 from './errors/error404';
import { selectUser, isAuth } from './selectors/user-selector';

import 'ngf-bootstrap/dist/bootstrap.min.css';

const Login = React.lazy(() => import('./user/login'));
const Profile = React.lazy(() => import('./user/profile'));

const renderIfAdmin = (routeProps) => (isAuth, user, Component) => {
  if (isAuth && user.roles && user.roles === 'admin') {
    return <Component {...routeProps} />
  } else {
    return <Login {...routeProps} />
  }
}

export const App = ({ isAuth, user }) => {

  // axios.defaults.baseURL = 'https://immense-earth-80859.herokuapp.com/';
  axios.defaults.baseURL = 'http://localhost:8080/';
  return (
    <>
      <Router history={history}>
        <NavBar></NavBar>
        <div style={{ "marginTop": "70px" }}>
          <Switch>
            <Redirect exact from="/" to="/events" />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/new" render={routeProps => renderIfAdmin(routeProps)(isAuth, user, CreateEvent)} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/session/new" component={CreateSession} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={Profile} />
            <Route exact path="/users" component = {UserList} />
            <Route exact path="/error" component={Error404} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    </>
  );
}



const mapStateToProps = state => {
  return {
    isAuth: isAuth(state),
    user: selectUser(state)
  };
};


export default connect(mapStateToProps, null)(App);