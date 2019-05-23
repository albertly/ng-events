import React from 'react';

function Session({session}) {

    return (
        <div className="col-md-10">
        <div className="well">
            <h4>{session.name}</h4>
            <h6>{session.presenter}</h6>
            <span>Duration: {session.duration}</span><br />
            <span>Level: {session.level}</span>
            <p>{session.abstract}</p>
        </div>
      </div>
    )
}

export default Session;