import React from 'react'
import 'ngf-bootstrap/dist/bootstrap.min.css';
import './EventThumbnail.css';

function EventThumbnail(props) {

    return (
      <div className="well hoverwell thumbnail">
        <h2>{props.event.name}</h2>
        <div>Date: {props.event.date}</div>
        <div>Time: {props.event.time}</div>
        <div>Price: $ {props.event.price}</div>
        <div>
          <span>Location: {props.event.location.address}</span>
          <span className="pad-left">{props.event.location.city}, {props.event.location.country}</span>
        </div>
      </div>
    );
  }
  
  export default EventThumbnail;