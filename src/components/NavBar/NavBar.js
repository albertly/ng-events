/* eslint jsx-a11y/anchor-is-valid: 0 */  // --> OFF

import React from 'react';
import 'ngf-bootstrap/dist/bootstrap.min.css';
import './NavBar.css';

function NavBar() {
    return (
            <div className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href="#">ngEvents</a>
                </div>

                <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li>
                    <a href="#">All Events</a>
                    </li>
                    <li><a href="#">Create Event</a></li>
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
                    <ul className="nav navbar-nav">
                    <li>
                        <a href="#">Welcome John</a>
                    </li>
                    </ul>
                </div>
                <form id="searchForm"  className="navbar-form navbar-right"  >
                    <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search Sessions" />
                    </div>
                    <button className="btn btn-default" >
                    Search
                    </button>
                </form>
                </div>
            </div>
            </div>
    );
  }
  
  export default NavBar;