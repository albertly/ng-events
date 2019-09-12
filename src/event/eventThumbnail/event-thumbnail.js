import React from 'react'
import { Panel, Button, Glyphicon, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';

import styles from './event-thumbnail.module.css';

const EventThumbnail = props => {
  let place = '';
  let placeText = '';
  let startTime = '';

  const getStartTimeStyle = () => {
    if (props.event.time === '8:00 am')
      return { color: '#003300', 'fontWeight': 'bold' }
    return {}
  }

  switch (props.event.time) {
    case '8:00 am': startTime = ' (Early Start)'; break;
    case '10:00 am': startTime = ' (Late Start)'; break;
    default: startTime = ' (Normal Start)';
  }

  if (!props.event.location) {
    placeText = props.event.onlineUrl;
    place = <div>
      Online URL: {props.event.onlineUrl}
    </div>;
  }
  else {
    placeText = props.event.location.address + ' \n' + props.event.location.city + '\n' + props.event.location.country;
    place = <div>
      <span>Location: {props.event.location.address}</span>
      <span className={styles['pad-left']}>{props.event.location.city}, {props.event.location.country}</span>
    </div>;
  }

  return (
    <Panel onClick={() => props.onClickHandler(props.event._id)} className={[styles.well, styles.thumbnail].join(' ')}>
      <Panel.Title className={styles.fr}>
        <ButtonToolbar >
          <ButtonGroup >
            <Button bsSize="xsmall" onClick={(e) => props.onDeleteEventHandler(e, props.event._id)}>
              <Glyphicon glyph="trash" />
            </Button>
            <Button bsSize="xsmall">
              <Glyphicon glyph="pencil" />
            </Button>
            <span onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}>
            <StripeCheckout
              name={props.event.name}
              description={ new Date(props.event.date).toDateString() + ' ' + placeText}
              amount={props.event.price * 100}
              token={token => props.onPay(token, props.event._id)}
              stripeKey={'pk_test_j3acsib29tsMFPqakQN0pc8T00gvFoiYIH'}
            >
              <Button bsSize="xsmall" >
                <Glyphicon glyph="shopping-cart" />
              </Button>

            </StripeCheckout>
            </span>
            <Button bsSize="xsmall">
              <Glyphicon glyph="list" />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Panel.Title>
      <Panel.Body>
        <h2>{props.event.name.toUpperCase()}</h2>
        <div>Date: {(new Date(props.event.date)).toDateString()}</div>
        <div style={getStartTimeStyle()}>Time: {props.event.time}
          <span>{startTime}</span>
        </div>
        <div>Price: ${props.event.price}</div>
        {place}
      </Panel.Body>
    </Panel>
  );
}

export default EventThumbnail;