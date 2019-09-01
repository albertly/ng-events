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
            headerName: "Id", field: "_id", sortable: false, width: 190
        }, {
            headerName: "User Name", field: "userName", sortable: true, width: 190
        }, {
            headerName: "Email", field: "email", sortable: true,  width: 190
        }, {
            headerName: "First Name", field: "firstName", sortable: true, width: 150
        }, {
            headerName: "Last Name", field: "lastName", sortable: true, width: 150
        }, {
            headerName: "Roles", field: "roles", sortable: true, width: 90
        }, {
            headerName: "", field: "googleProvider", sortable: true, width: 50,
            cellRenderer: function(params) {
                return params.data.googleProvider ? '<img src="/assets/images/g1.png" height="20" width="40" alt=""/>' : "";
            } 
        }
     ]        
    }

    useEffect(() => {
        axios.get('/api/users?limit=50')
       // .then(result => result.json())
        .then(rowData => {
            setUserData(rowData.data.data);
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
                    paginationPageSize='3'
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