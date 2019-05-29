import React, {useState, useEffect} from 'react';
import {CreateSession, Session} from  '../';
import {getEvent, updateEvent} from '../../../shared/events';
import styles from './EventDetails.module.css';

function EventDetails({match, history}) {

    const [event, setEvent] = useState({});
    const [addMode, setAddMode] = useState(false);

    const [filterBy, setFilterBy] = useState('All');
    const [sortBy, setSortBy] = useState('votes');

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
        <div className={ [styles.container, 'container'].join(' ')}>
            <img src={event.imageUrl} alt={event.name} className={styles['event-image']}/> 

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
            <div className="row" style={{marginBottom :'10px'}}>
                <div className="col-md-2">
                    <h3 style={{margin:0}}>Sessions</h3>
                </div>

                <div className="col-md-7">
                    <div className="btn-group btn-group-sm" style={{marginRight:'20px', marginLeft:'20px'}}>
                        <button className={'btn btn-default '.concat((sortBy === 'name') ? 'active': '')}
                                onClick={()=>setSortBy('name')}>By Name</button>
                        <button className={'btn btn-default '.concat((sortBy === 'votes') ? 'active': '')} 
                                onClick={()=>setSortBy('votes')}>By Votes</button>
                    </div>

                    <div className="btn-group btn-group-sm">
                        <button className={'btn btn-default '.concat((filterBy === 'All') ? 'active': '')}
                                onClick={()=>setFilterBy('All')}>All</button>
                        <button className={'btn btn-default '.concat((filterBy === 'Beginner') ? 'active': '')}
                                onClick={()=>setFilterBy('Beginner')}>Beginner</button>
                        <button className={'btn btn-default '.concat((filterBy === 'Intermediate') ? 'active': '')}
                                onClick={()=>setFilterBy('Intermediate')}>Intermediate</button>
                        <button className={'btn btn-default '.concat((filterBy === 'Advanced') ? 'active': '')}
                                onClick={()=>setFilterBy('Advanced')}>Advanced</button>
                    </div>
                </div>

                <div className="col-md-2">
                    <a onClick={()=>{setAddMode(true)}}>Add Session</a>
                </div>
            </div>
            {event.sessions && !addMode &&
                <div className="row" >

                {event.sessions.filter(session =>  filterBy === 'All' ? true :  session.level === filterBy)
                               .sort( (a, b) => sortBy === 'votes' ? (a.voters.length > b.voters.length) ? 1 : -1
                                                                   : (a.name > b.name) ? 1 : -1)
                               .map(session => <Session key={session.id} session={session} />)}
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
