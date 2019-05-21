import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import EventsList from './components/event/EventsList/EventsList';
import CreateEvent from './components/event/CreateEvent/CreateEvent';
import EventDetails from './components/event/EventDetails/EventDetails';
import Error404 from './components/errors/Error404';
import Login from './components/User/Login';
import Profile from './components/User/Profile';
import {ContextAuthProvider} from './shared/ContextAuth';

import 'ngf-bootstrap/dist/bootstrap.min.css';
import './App.css';


const App = () => {

  return (
  <ContextAuthProvider> 
   <Router>
    <NavBar></NavBar>
    <Switch>
      <Redirect exact from="/" to="/events"/>
      <Route exact path="/events"  component={EventsList} />
      <Route exact path="/events/new" component={CreateEvent} />
      <Route exact path="/events/:id"  component={EventDetails} />
      <Route exact path="/login"  component={Login} />
      <Route exact path="/profile"  component={Profile} />
      <Route exact path="/error"  component={Error404} />
      <Route component={Error404} />     
    </Switch>
   </Router>
   </ContextAuthProvider>
  );
}

export default App;
