import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getEvents, deleteEvent } from '../../actions/events-actions';
import { pay } from '../../actions/payment-action';
import { selectEvents } from '../../selectors/events-selector';
import { EventThumbnail } from '..';

function EventsList(props) {

  useEffect(() => {
    props.fetchEvents();
  },
    // eslint-disable-next-line
    []);

  const handleThumbnailClick = eventId => props.history.push(`/events/${eventId}`);

  const handleDeleteSingleEvent = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    props.deleteSingleEvent(eventId);
  }

  const payHandler = (token, eventId) => {
    props.payHandler( token, eventId);
  }

  return (
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div className="row">
        {props.events.map(e => <div key={e._id} className="col-md-5"><EventThumbnail onPay={payHandler} onDeleteEventHandler={handleDeleteSingleEvent} onClickHandler={handleThumbnailClick} event={e}></EventThumbnail></div>)}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    events: selectEvents(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => {
      dispatch(getEvents());
    },
    deleteSingleEvent: (eventId) => {
      dispatch(deleteEvent(eventId));
    },
    payHandler: (token, eventId) => {
      dispatch(pay(token, eventId))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);