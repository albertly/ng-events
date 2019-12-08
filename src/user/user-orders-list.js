import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import styles from './user-list.module.css';

export function UserOrdersList({ orders }) {
    const [gridApi, setGridApi] = useState('a');

    let savedAPI = null;

    const state = {
        columnDefs: [{
            headerName: "Id", field: "_id", sortable: false, width: 190
        }, {
            headerName: "Event Name", field: "eventId.name", sortable: true, width: 190
        }, {
            headerName: "Event Date", field: "eventId.date", sortable: true,  width: 190
        }, {
            headerName: "Price", field: "eventId.price", sortable: true, width: 150
        }, {
            headerName: "Purchase Date", field: "purchaseDate", sortable: true, width: 150
        }, 
         {
            headerName: "", width:100, 
            cellRendererFramework: () => <ButtonGroup >
                                          <Button  bsSize="xsmall"  className={styles['btn-primary-outline']}  onClick={()=>{}}>
                                            <Glyphicon glyph="trash" />
                                         </Button>
                                         <Button  bsSize="xsmall" className={styles['btn-primary-outline']}  onClick={()=>{}}>
                                            <Glyphicon glyph="pencil" />
                                         </Button>
                                         </ButtonGroup>
         }
     ]        
    }

    const onGridReady = params => {
        setGridApi(params.api);
        savedAPI = params.api;
    };
    
    const onRemoveSelected = () => {
       // let selectedData = savedAPI.getSelectedRows();
       // onDeleteUser(selectedData[0]._id, history);
       // savedAPI.updateRowData({ remove: selectedData });
    }

    const onEditSelected = () => {
        let selectedData = savedAPI.getSelectedRows();
        
     //   history.push(`/user-edit/${selectedData[0]._id}`);
    }

    return (
        <>
            <h3>Orders</h3>
            <div
                className="ag-theme-balham-dark"
                style={{
                    height: '200px',
                    width: '90%'
                }}
            >
                <AgGridReact
                    paginationPageSize='3'
                    rowSelection='single'
                    pagination='true'
                    columnDefs={state.columnDefs}
                    rowData={orders}
                    onGridReady={onGridReady}>
                </AgGridReact>
            </div>
        </>
    )
}


export default UserOrdersList