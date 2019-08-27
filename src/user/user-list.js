import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export function UserList({ history }) {

    const state = {
        columnDefs: [{
            headerName: "Make", field: "make", sortable: true
        }, {
            headerName: "Model", field: "model", sortable: true
        }, {
            headerName: "Price", field: "price", sortable: true
        }],
        rowData: [{
            make: "Toyota", model: "Celica", price: 35000
        }, {
            make: "Ford", model: "Mondeo", price: 32000
        }, {
            make: "Porsche", model: "Boxter", price: 72000
        }]
    }


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
                    rowData={state.rowData}>
                </AgGridReact>
            </div>
        </>
    )
}

export default connect(
    null,
    null
)(UserList);