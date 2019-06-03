import React, { useContext } from 'react';

import { AuthContext } from '../../../shared/ContextAuth';
import { userHasVoted, deleteVoter, addVoter } from '../../../shared/events';
import Upvote from './upvote';

import CollapsibleWell from '../../../shared/collapsible-well'

function Session({session}) {
    const { state, } = useContext(AuthContext);

    const toggleVoter = () => {
        console.log('toggleVote');
        const userName = state.userName;
        if(userHasVoted(session, userName )) {
          deleteVoter(session, userName);
        } else {
          addVoter(session, userName);
        }
        // if(this.sortBy === 'votes') {
        //   this.visibleSessions.sort(sortByVotesDesc);
        // }
    }

    return (
        <div className="row" >
            <div className="col-md-1">
                {state.isAuthenticated() && (
                    <div>
                        <Upvote count={session.voters.length} voted={userHasVoted(session, state.userName )} toggleVoter={toggleVoter}></Upvote>
                    </div>
                )}
            </div>

            <div className="col-md-10">
                <CollapsibleWell title={session.name} showFire={session.voters.length > 2}>
                    <div>
                        <h6>{session.presenter}</h6>
                        <span>Duration: {session.duration}</span><br />
                        <span>Level: {session.level}</span>
                        <p>{session.abstract}</p>
                    </div>
                </CollapsibleWell>
            </div>
        </div>
    )
}

export default Session;