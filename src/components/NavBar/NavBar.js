/* eslint jsx-a11y/anchor-is-valid: 0 */  // --> OFF

import React, { useState, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../shared/ContextAuth';
import  SimpleModal  from '../../shared/simple-modal';

//import $ from 'jquery';
import styles from './NavBar.module.css';

function NavBar() {
    const { state,  } = useContext(AuthContext);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ modalShow, setModalShow ]  = useState(false);
   // const modalEl = useRef(null);

    const handleOnChange  = (event) => {
        setSearchTerm(event.target.value);
    }
    const searchSessions = e => {
        e.preventDefault();
        setModalShow(true);
    }
    const handleModalClose = () => {
        setModalShow(false);
    }

    return (
        <>
            <div className={ ['navbar', 'navbar-default'].join(' ')}>
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#">ngEvents</a>
                    </div>

                    <div className="collapse navbar-collapse">
                    <ul className={ ['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>           
                        <li>
                            <NavLink exact to="/events/" activeClassName="active">All Events</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/events/new" activeClassName="active">Create Event</NavLink>
                        </li>
                        <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" >
                            Events
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li >
                            <a href="#">Angular Connect</a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    <div className="navbar-header navbar-right">
                        <ul className={ ['nav', 'navbar-nav', styles['nav'], styles['navbar-nav']].join(' ')}>
                        <li>
                            {!state.isAuthenticated() ? (
                                <NavLink exact to="/login" activeClassName="active">Login</NavLink>
                            ) : (
                                <NavLink exact to="/profile" activeClassName="active">{state.firstName}</NavLink>
                            )
                            }
                        </li>
                        </ul>
                    </div>
                    <form id="searchForm"  className="navbar-form navbar-right"  >
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search Sessions" onChange={handleOnChange} value={searchTerm} />
                        </div>
                        <button className="btn btn-default" onClick={searchSessions} data-target="#searchResults">
                        Search
                        </button>
                    </form>
                    </div>
                </div>
            </div>

            <SimpleModal  elementId="searchResults" title="Matching Sessions" show={modalShow} onClose={handleModalClose}>
                <div>Hello</div>                
            </SimpleModal>

        </>
    );
  }
  
  export default NavBar;