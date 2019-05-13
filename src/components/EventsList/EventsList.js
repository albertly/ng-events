import React from 'react';

import 'ngf-bootstrap/dist/bootstrap.min.css';

import EventThumbnail from '../EventThumbnail/EventThumbnail';

function EventsList() {
    const event1 = {
        id: 1,
        name: 'Angular Connect',
        date: '9/26/2036',
        time: '10:00 am',
        price: 599.99,
        imageUrl: '/assets/images/angularconnect-shield.png',
        location: {
          address: '1057 DT',
          city: 'London',
          country: 'England'
        }
    }

    return (
        <div>
        <h1>Upcoming Angular Events</h1>
        <hr/>
        <EventThumbnail event={event1}></EventThumbnail>
        </div>
    );
  }
  

  export default EventsList;