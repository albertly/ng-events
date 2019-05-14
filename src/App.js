import React from 'react';

import NavBar from './components/NavBar/NavBar';
import EventsList from './components/EventsList/EventsList';


import './App.css';

const App = () => {
  return (
   <>
    <NavBar></NavBar>
    <EventsList></EventsList>
   </>
  );
}

export default App;
