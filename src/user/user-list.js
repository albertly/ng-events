import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';

import { deleteUser } from '../actions/user-actions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import styles from './user-list.module.css';

export function UserList({onDeleteUser, history }) {
    const [userData, setUserData] = useState([]);
    const [gridApi, setGridApi] = useState('a');

    let savedAPI = null;

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
         },{
            headerName: "", field: "googleProvider", sortable: true, width: 50,
            cellRenderer: function(params) {
                return params.data.googleProvider ? '<img src="/assets/images/g1.png" height="20" width="40" alt=""/>' : '';
            }
         },
         {
            headerName: "", width:100, 
            cellRendererFramework: () => <ButtonGroup >
                                          <Button  bsSize="xsmall"  className={styles['btn-primary-outline']}  onClick={onRemoveSelected}>
                                            <Glyphicon glyph="trash" />
                                         </Button>
                                         <Button  bsSize="xsmall" className={styles['btn-primary-outline']}  onClick={onRemoveSelected}>
                                            <Glyphicon glyph="pencil" />
                                         </Button>
                                         </ButtonGroup>
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

    const onGridReady = params => {
        setGridApi(params.api);
        savedAPI = params.api;
    };
    
    const onRemoveSelected = () => {
        let selectedData = savedAPI.getSelectedRows();
        console.log('Data', selectedData[0]._id);
        onDeleteUser(selectedData[0]._id, history);
        savedAPI.updateRowData({ remove: selectedData });
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
                    paginationPageSize='3'
                    rowSelection='single'
                    pagination='true'
                    columnDefs={state.columnDefs}
                    rowData={userData}
                    onGridReady={onGridReady}>
                </AgGridReact>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
      onDeleteUser: (userId, history) => {
        dispatch(deleteUser(userId, history));
      }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(UserList);