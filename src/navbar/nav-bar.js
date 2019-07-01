/* eslint jsx-a11y/anchor-is-valid: 0 */  // --> OFF

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { NavLink, Link } from 'react-router-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { selectUser, isAuth } from '../selectors/user-selector';
import SimpleModal from '../shared/simple-modal';
import { searchSessionsAction } from '../shared/contex-events';

import styles from './nav-bar.module.css';

function NavBar({ isAuth, user }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [sessions, setSessions] = useState([]);

    const handleOnChange = event => setSearchTerm(event.target.value);

    const search = e => {
        e.preventDefault();
        setModalShow(true);
        searchSessionsAction(searchTerm).then(results => {
            setSessions(results);
        })
    }

    const handleModalClose = () => {
        setSearchTerm('');
        setModalShow(false);
    }

    return (
        <>
            <div className={['navbar', 'navbar-default'].join(' ')}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">ngEvents</a>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className={['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>
                            <li>
                                <NavLink exact to="/events/" activeClassName={styles['active']}>All Events</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/events/new" activeClassName={styles['active']}>Create Event</NavLink>
                            </li>
                            <li>
                                <DropdownButton id="ddb" className="dropdown" title="Events">
                                    <MenuItem eventKey="1">Angular Connect</MenuItem>
                                </DropdownButton>
                            </li>
                        </ul>
                        <div className="navbar-header navbar-right">
                            <ul className={['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>
                                <li>
                                    {!isAuth ? (
                                        <NavLink exact to="/login" activeClassName={styles['active']}>Login</NavLink>
                                    ) : (
                                            <NavLink exact to="/profile" activeClassName={styles['active']}>{user.firstName}</NavLink>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                        <form id={styles['searchForm']} className="navbar-form navbar-right"  >
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search Sessions" onChange={handleOnChange} value={searchTerm} />
                            </div>
                            <button className="btn btn-default" onClick={search}>
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <SimpleModal elementId="searchResults" title="Matching Sessions" show={modalShow} onClose={handleModalClose}>
                {sessions.map(session => (
                    <div className="list-group" key={`${session.id}-${session.eventId}`}>
                        <Link className="list-group-item" onClick={handleModalClose} to={`/events/${session.eventId}`}>
                            {session.name}
                        </Link>
                    </div>
                )
                )
                }
            </SimpleModal>
        </>
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
)(NavBar);