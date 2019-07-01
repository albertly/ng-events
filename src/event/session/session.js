import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { selectUser, isAuth } from '../../selectors/user-selector';

import { EventsContext, voteAction } from '../../shared/contex-events';
import Upvote from './upvote';
import CollapsibleWell from '../../shared/collapsible-well'


function Session({isAuth, user, eventId, session, resort }) {
    const { _, dispatch } = useContext(EventsContext);

    const userHasVoted = (session, voterName) => {
        return session.voters.some(voter => voter === voterName);
    }

    const toggleVoter = () => {
        const userName = user.userName;
        let action = 'add';
        if(userHasVoted(session, userName )) {
          action = 'delete';         
        }

        voteAction(dispatch, eventId, session.id, userName, action).then(() => {
            resort();
        })

        // if(this.sortBy === 'votes') {
        //   this.visibleSessions.sort(sortByVotesDesc);
        // }
    }

    return (
        <div className="row" >
            <div className="col-md-1">
                { isAuth && (
                    <div>
                        <Upvote count={session.voters.length}
                                voted={userHasVoted(session, user.userName )}
                                toggleVoter={toggleVoter}>
                        </Upvote>
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
    );
}


const mapStateToProps = state => {
    return {
        isAuth: isAuth(state),
        user: selectUser(state)
    };
};

export default connect(
    mapStateToProps,
    null
)(Session);

