import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export function UserList({ history }) {
    const [userData, setUserData] = useState([]);
    const state = {
        columnDefs: [{
            headerName: "Id", field: "_id", sortable: false
        }, {
            headerName: "User Name", field: "userName", sortable: true
        }, {
            headerName: "Email", field: "email", sortable: true
        }, {
            headerName: "First Name", field: "firstName", sortable: true
        }, {
            headerName: "Last Name", field: "lastName", sortable: true
        }, {
            headerName: "Roles", field: "roles", sortable: true
        } ]        
    }

    useEffect(() => {
        axios.get('/api/users')
       // .then(result => result.json())
        .then(rowData => {
            console.log(rowData);
            setUserData(rowData.data.data);
            console.log(state);
        })
        .catch(err => {
            console.log(err);
        });                        
    },[]);

    return (
        <>
            <h1>User List</h1>
            <hr />

            <div
                className="ag-theme-balham-dark"
                style={{
                    height: '500px',
                    width: '100%'
                }}
            >
                <AgGridReact
                    rowSelection='single'
                    pagination='true'
                    columnDefs={state.columnDefs}
                    rowData={userData}>
                </AgGridReact>
            </div>
        </>
    )
}

export default connect(
    null,
    null
)(UserList);