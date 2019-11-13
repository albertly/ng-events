import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

function FileCellRenderer({onRemoveSelected}) {
//
        console.log(onRemoveSelected);
        return (
            <div>
                    <button onClick={onRemoveSelected}>x1</button>
            </div>
        );


}


export function UserList({ history }) {
    const [userData, setUserData] = useState([]);
    const [gridApi, setGridApi] = useState('a');

    const frameworkComponents = {
        fileCellRenderer: FileCellRenderer
    };
    
    const state = {
        columnDefs: [
        {
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
         },

         {
            headerName: "", field: "googleProvider", sortable: true, width: 50,
         },
         {
            headerName: "Action", width:50, 
            cellRendererFramework: () => <button onClick={onRemoveSelected}>a2</button>
         }
            // function(params) {
            //     return params.data.googleProvider ? '<img src="/assets/images/g1.png" height="20" width="40" alt=""/>' : "";
            // }

            // cellRenderer: function(params) {

            //     var eDiv = document.createElement('button');
            //     eDiv.innerHTML = '<span class="my-css-class"><button class="btn-simple">Push Me</button></span>';
            //     var eButton = eDiv.querySelectorAll('.btn-simple')[0];
            
            //     eButton.addEventListener('click', function() {
            //         onRemoveSelected();
            //     });
            
            //     return eDiv;

            //     //return '<button onClick={onRemoveSelected}>x</button>';
            // }
        
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


    let gridColumnApi = null;

    const onGridReady = params => {
        console.log("params ", params.api);
        setGridApi(params.api);
        console.log("Grid API 1", gridApi);
        console.log("Grid API 2", params.api);
        //gridColumnApi = params.columnApi;
        
    };
    
    const onRemoveSelected = () => {
        console.log('Grid 1',gridApi);
        var selectedData = gridApi.getSelectedRows();
        console.log('Data', selectedData);
       // var res = this.gridApi.updateRowData({ remove: selectedData });
       // printResult(res);
    }

    return (
        <>
            <h1>User List</h1>
            <hr />
            <button onClick={onRemoveSelected}>Remove</button>
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

export default connect(
    null,
    null
)(UserList);