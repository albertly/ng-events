import React from 'react';


import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import Events from '../../../shared/events';
import EventThumbnail from '../EventThumbnail/EventThumbnail';

const EventsList = (props) => {

 const events = Events();
 
  const handleThumbnailClick = eventId => props.history.push(`/events/${eventId}`);
    
  return (
        <div>
        <h1 onClick={() => alert(props.history)} >Upcoming Angular Events</h1>
        <hr/>
        <div className="row">
          {events.map(e => <div key={e.id} className="col-md-5"><EventThumbnail onClickHandler={handleThumbnailClick}  event={e}></EventThumbnail></div>)}
        </div>
        </div>
    );
  }
  

  export default EventsList;