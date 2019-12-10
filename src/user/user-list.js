import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';

import { deleteUser } from '../actions/user-actions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import styles from './user-list.module.css';

export function UserList({ onDeleteUser, history }) {
    const [userData, setUserData] = useState([]);
    const [gridApi, setGridApi] = useState('a');

    let savedAPI = null;

    const state = {
        columnDefs: [{
            headerName: "Id", field: "_id", sortable: false, width: 190
        }, {
            headerName: "User Name", field: "userName", sortable: true, width: 190,
            filter: "agTextColumnFilter",
            filterParams: {
                filterOptions: ["contains", "notContains"],
                textFormatter: function (r) {
                    if (r == null) return null;
                    r = r.replace(new RegExp("[àáâãäå]", "g"), "a");
                    r = r.replace(new RegExp("æ", "g"), "ae");
                    r = r.replace(new RegExp("ç", "g"), "c");
                    r = r.replace(new RegExp("[èéêë]", "g"), "e");
                    r = r.replace(new RegExp("[ìíîï]", "g"), "i");
                    r = r.replace(new RegExp("ñ", "g"), "n");
                    r = r.replace(new RegExp("[òóôõøö]", "g"), "o");
                    r = r.replace(new RegExp("œ", "g"), "oe");
                    r = r.replace(new RegExp("[ùúûü]", "g"), "u");
                    r = r.replace(new RegExp("[ýÿ]", "g"), "y");
                    return r;
                },
                debounceMs: 0,
                caseSensitive: true,
                suppressAndOrCondition: true
            }
        }, {
            headerName: "Email", field: "email", sortable: true, width: 190
        }, {
            headerName: "First Name", field: "firstName", sortable: true, width: 150
        }, {
            headerName: "Last Name", field: "lastName", sortable: true, width: 150
        }, {
            headerName: "Roles", field: "roles", sortable: true, width: 90
        }, {
            headerName: "", field: "googleProvider", sortable: true, width: 50,
            cellRenderer: function (params) {
                return params.data.googleProvider ? '<img src="/assets/images/g1.png" height="20" width="40" alt=""/>' : '';
            }
        },
        {
            headerName: "", width: 100,
            cellRendererFramework: () => <ButtonGroup >
                <Button bsSize="xsmall" className={styles['btn-primary-outline']} onClick={onRemoveSelected}>
                    <Glyphicon glyph="trash" />
                </Button>
                <Button bsSize="xsmall" className={styles['btn-primary-outline']} onClick={onEditSelected}>
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
    }, []);

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

    const onEditSelected = () => {
        let selectedData = savedAPI.getSelectedRows();

        history.push(`/user-edit/${selectedData[0]._id}`);
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
                    paginationPageSize='4'
                    rowSelection='single'
                    pagination='true'
                    columnDefs={state.columnDefs}
                    rowData={userData}
                    floatingFilter={true}
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