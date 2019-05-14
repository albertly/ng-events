import React from 'react'
import 'ngf-bootstrap/dist/bootstrap.min.css';
import './EventThumbnail.css';

function EventThumbnail(props) {
    let place =  '';
    let startTime = '';

    switch(props.event.time) {
      case '8:00 am': startTime = ' (Early Start)'; break;
      case '10:00 am': startTime = ' (Late Start)'; break;
      default : startTime = ' (Normal Start)';
    }

  //  <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">Time: {{event?.time}}

    if (!props.event.location) {
      place =  <div>
                 Online URL: {props.event.onlineUrl}
                </div>;
    }
    else {
      place =  <div>
                  <span>Location: {props.event.location.address}</span>
                  <span className="pad-left">{props.event.location.city}, {props.event.location.country}</span>
                </div>;   
    }

    return (
      <div className="well hoverwell thumbnail">
        <h2>{props.event.name}</h2>
        <div>Date: {props.event.date}</div>
        <div style={getStartTimeStyle()}>Time: {props.event.time}
          <span>{startTime}</span>
        </div>
        <div>Price: ${props.event.price}</div>
        {place}
      </div>
    );

    function getStartTimeStyle() {
      if (props.event.time === '8:00 am')
        return {color: '#003300', 'font-weight': 'bold'}
      return {}
    }
  }
  
  export default EventThumbnail;