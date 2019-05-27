import React from 'react';

import CollapsibleWell from '../../../shared/collapsible-well'

function Session({session}) {

    return (
        <div className="col-md-10">
        <CollapsibleWell title={session.name}>
            <div>
                <h6>{session.presenter}</h6>
                <span>Duration: {session.duration}</span><br />
                <span>Level: {session.level}</span>
                <p>{session.abstract}</p>
            </div>
        </CollapsibleWell>
      </div>
    )
}

export default Session;