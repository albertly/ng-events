import React from 'react';

import NavBar from './components/NavBar/NavBar';
import EventsList from './components/EventsList/EventsList';
import  'bootstrap/dist/js/bootstrap.min.js';

import './App.css';

function App() {
  return (
   <>
    <NavBar></NavBar>
    <EventsList></EventsList>
   </>
  );
}

export default App;
