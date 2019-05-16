import React from 'react';

function CreateEvent() {

    const cancelHandler = () => {};

    return (
    <>
        <h1>New Event</h1>
        <hr/>
        <div className="col-md-6">
            <h3>[Create Event Form will go here]</h3>
            <br/>
            <br/>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-default" onClick="cancelHandler()">Cancel</button>
        </div>    
    </>   
    );
}

export default CreateEvent;