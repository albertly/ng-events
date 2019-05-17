import React, {useState, useEffect} from 'react';
import { Prompt } from 'react-router-dom';

function CreateEvent({history}) {

    const [isDirty, setDirty] = useState(true);

    const cancelHandler = () => history.push('/events');

    return (
    <>
        <Prompt when={isDirty}
            message="You have not saved this event, do you really want to cancel?"
        />
        <h1>New Event</h1>
        <hr/>
        <div className="col-md-6">
            <h3>[Create Event Form will go here]</h3>
            <br/>
            <br/>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-default" onClick={cancelHandler}>Cancel</button>
        </div>    
    </>   
    );
}

export default CreateEvent;