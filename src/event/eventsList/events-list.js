import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getEvents } from '../../actions/events-actions';
import { selectEvents } from '../../selectors/events-selector';
import { EventThumbnail } from '..';

function EventsList(props) {

  useEffect(() => {
    props.fetchEvents();
  },
    // eslint-disable-next-line
    []);

  const handleThumbnailClick = eventId => props.history.push(`/events/${eventId}`);
  return (
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div className="row">
        {props.events.map(e => <div key={e.id} className="col-md-5"><EventThumbnail onClickHandler={handleThumbnailClick} event={e}></EventThumbnail></div>)}
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);