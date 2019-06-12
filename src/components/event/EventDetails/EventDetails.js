import React, {useContext, useState, useEffect} from 'react';
import {CreateSession, Session} from  '../';
import {getEvent, updateEvent} from '../../../shared/events';
import { EventsContext, getEventAction } from '../../../shared/contex-events';
import styles from './EventDetails.module.css';

function useForceUpdate(){
    const [value, set] = useState(true); //boolean state
    return () => set(!value); // toggle the state to force render
}

function EventDetails({match, history}) {

    console.log('match ', match);
    console.log('history', history);
    //const [event, setEvent] = useState({});
    let event= {};
    const [addMode, setAddMode] = useState(false);

    const [filterBy, setFilterBy] = useState('All');
    const [sortBy, setSortBy] = useState('votes');

    const { state, dispatch } = useContext(EventsContext);

    useEffect(() => {
 
        getEventAction(dispatch, match.params.id);
      //  setEvent(state.currentEvent);
        // .then(setTimeout(() => {
        //     console.log('currentEvent A' , state);
        //     if (!state.currentEvent) {
        //         history.push('/error');
        //     }
        //     else {
        //         setEvent(state.currentEvent);
        //     }
        // },10000));
    }, []);

    const forceUpdate = useForceUpdate();

    const saveNewSession = session => {
        console.log('saveNewSession');
        const nextId = Math.max.apply(null, event.sessions.map(s => s.id));
        session.id = nextId + 1;
        event.sessions.push(session);
        updateEvent(event);
        setAddMode(false);
    };

    const resort = () => {
        if (sortBy === 'votes') {
            forceUpdate();
        }
    }

    event = state.currentEvent;
    if (!state.currentEvent) {
        history.push('/error');
    }

    return (
        <div className={ [styles.container, 'container'].join(' ')}>
            <img src={event.imageUrl} alt={event.name} className={styles['event-image']}/> 

            <div className="row">
                <div className="col-md-11">
                <h2>{ !event.name || event.name.toUpperCase() } </h2>
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
                               .map(session => <Session key={session.id} session={session} resort={resort}/>)}
                </div>
            }
            
            {addMode &&
                <CreateSession cancelHandler={()=>setAddMode(false)} addSessionHandler={session => saveNewSession(session)}/>
            }

        </div>
    );
}

export default EventDetails;
