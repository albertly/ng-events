/* eslint jsx-a11y/anchor-is-valid: 0 */  // --> OFF

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import history from '../history';

import { NavLink, Link } from 'react-router-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { selectUser, isAuth } from '../selectors/user-selector';
import SimpleModal from '../shared/simple-modal';
import { searchSessionsAction } from '../actions/events-actions';
import { logoffUser } from '../actions/user-actions';
import Avatar from '../shared/avatar';

import styles from './nav-bar.module.css';

function NavBar({ isAuth, user, logOff }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [sessions, setSessions] = useState([]);

    const handleOnChange = event => setSearchTerm(event.target.value);

    const signup = e => {
        history.push('/signup');
    }

    const search = e => {
        e.preventDefault();
        setSessions([]);
        setModalShow(true);
        searchSessionsAction(searchTerm).then(results => {
            setSessions(results);
        })
    }

    const handleModalClose = () => {
        setSearchTerm('');
        setModalShow(false);
    }

    const { to, text } = (() => {
        return !isAuth ?
            {
                to: '/login',
                text: 'Login'
            }
            :
            {
                to: '/profile',
                text: user.firstName
            }
    })();


    return (
        <>
            <Navbar collapseOnSelect={true} fixedTop className={['navbar', 'navbar-default'].join(' ')}>

                <Navbar.Header>
                    <Navbar.Toggle />
                    <Navbar.Brand>
                        <a href="#">ngEvents</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Navbar.Collapse className="collapse navbar-collapse">
                    <Nav className={['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>
                        <NavItem componentClass={NavLink} exact to="/events/" href="/events/" activeClassName={styles['active']}>
                            All Events
                        </NavItem>

                        <NavItem componentClass={NavLink} exact to="/users/" href="/users/" activeClassName={styles['active']}>
                            Users
                        </NavItem>

                        {isAuth && user.roles && user.roles === 'admin' && (
                            <NavItem componentClass={NavLink} exact to="/events/new" href="/events/new" activeClassName={styles['active']}>
                                Create Event
                            </NavItem>
                        )}

                        <NavItem componentClass={DropdownButton} id="ddb" className="dropdown" title="Events">
                            {/* <DropdownButton id="ddb" className="dropdown" title="Events"> */}
                            <MenuItem eventKey="1">Angular Connect</MenuItem>
                            {/* </DropdownButton> */}
                        </NavItem>
                    </Nav>
                    <div className="navbar-header navbar-right">
                        <Nav className={['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>
                            <NavItem componentClass={NavLink} exact to={to} href={to} activeClassName={styles['active']}>
                                {text}
                                {isAuth && (
                                    <Avatar user={user}></Avatar>
                                )}
                            </NavItem>
                            
                            {isAuth && (
                                <NavItem componentClass={NavLink} to="#" onClick={logOff} activeClassName={styles['active']}>
                                    Log Off
                                </NavItem>
                            )}
                            {!isAuth && (
                                <NavItem componentClass={NavLink} to="#" onClick={signup} activeClassName={styles['active']}>
                                    Sign Up
                                </NavItem>
                            )}
                        </Nav>
                    </div>
                    <form id={styles['searchForm']} className="navbar-form navbar-right"  >
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search Sessions" onChange={handleOnChange} value={searchTerm} />
                        </div>
                        <button className="btn btn-default" onClick={search}>
                            Search
                        </button>
                    </form>
                </Navbar.Collapse>

            </Navbar>

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

const mapDispatchToProps = dispatch => {
    return {
        logOff: () => { dispatch(logoffUser()); }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);