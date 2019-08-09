import React from 'react';
import { Router, Switch, Redirect, Route } from 'react-router-dom';
import history from './history';
import axios from 'axios';


import NavBar from './navbar/nav-bar';
import { EventsList, CreateEvent, EventDetails, CreateSession } from './event';
import Error404 from './errors/error404';

import 'ngf-bootstrap/dist/bootstrap.min.css';

const Login = React.lazy(() => import('./user/login'));
const Profile = React.lazy(() => import('./user/profile'));

const App = () => {

 // axios.defaults.baseURL = 'https://immense-earth-80859.herokuapp.com/';
 axios.defaults.baseURL = 'http://localhost:5000/';
  return (
    <>
      <Router history={history}>
        <NavBar></NavBar>
        <div style={{ "marginTop": "70px" }}>
          <Switch>
            <Redirect exact from="/" to="/events" />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/new" component={CreateEvent} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/session/new" component={CreateSession} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={Profile} />
            <Route exact path="/error" component={Error404} />
            <Route component={Error404} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
