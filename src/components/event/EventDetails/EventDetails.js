import React, {useState, useEffect} from 'react';
import Session from './Session';
import CreateSession from './CreateSession';
import {getEvent, updateEvent} from '../../../shared/events';
import './EventDetails.css';

function EventDetails({match, history}) {

    const [event, setEvent] = useState({});
    const [addMode, setAddMode] = useState(false);

    useEffect(() => {
        console.log('Id ' + match.params.id);
        const e = getEvent(match.params.id);
        if (!e) {
            history.push('/error');
        }
        else {
            setEvent(e);
        }
    }, [match.params.id]);

    const saveNewSession = session => {
        console.log('saveNewSession');
        const nextId = Math.max.apply(null, event.sessions.map(s => s.id));
        session.id = nextId + 1;
        event.sessions.push(session);
        updateEvent(event);
        setAddMode(false);
    };

    return (
        <div className="container">
            <img src={event.imageUrl} alt={event.name} className="event-image"/> 

            <div className="row">
                <div className="col-md-11">
                <h2>{event.name} </h2>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div><strong>Date:</strong> {event.date}</div>
                    <div><strong>Time:</strong> {event.time}</div>
                    <div><strong>Price:</strong> $ {event.price}</div>
                </div>
                {event.location && 
                <div className="col-md-6">
                    <address>
                        <strong>Address:</strong><br/>
                        {event.location.address}<br/>
                        {event.location.city}, {event.location.country}
                    </address>
                </div>
                }
            </div>

            <hr/>
            <div className="row">
                <div className="col-md-2">
                    <h3 style={{margin:0}}>Sessions</h3>
                </div>

                <div className="col-md-2">
                    <a onClick={()=>{setAddMode(true)}}>Add Session</a>
                </div>
            </div>
            {event.sessions && !addMode &&
                <div className="row" >
                {event.sessions.map(session => <Session key={session.id} session={session} />)}
                </div>
            }
            
            {addMode &&
                <div className="row" >
                    <CreateSession cancelHandler={()=>setAddMode(false)} addSessionHandler={session => saveNewSession(session)}/>
                </div>
            }

        </div>
    );
}

export default EventDetails;
