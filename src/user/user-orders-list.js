//How To Use Font Awesome 5 with React
//https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react
//https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render
import React, { useState, useEffect } from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faFilePdf } from '@fortawesome/fontawesome-free-solid'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import styles from './user-list.module.css';

export function UserOrdersList({ orders, userId }) {
    const [gridApi, setGridApi] = useState('a');

    let savedAPI = null;

    //How to download files using axios
    //https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
    const  getPDF =  () => {
        //axios.get(`/api/invoice/pdf/${userId}`);

        axios({
            url: `/api/invoice/pdf/${userId}`, //your url
            method: 'GET',
          //  responseType: 'blob', // important
          }).then((response) => {
             console.log(response);
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }

    const state = {
        columnDefs: [{
            headerName: "Id", field: "_id", sortable: false, width: 190
        }, {
            headerName: "Event Name", field: "eventId.name", sortable: true, width: 190
        }, {
            headerName: "Event Date", field: "eventId.date", sortable: true, width: 190
        }, {
            headerName: "Price", field: "eventId.price", sortable: true, width: 150
        }, {
            headerName: "Purchase Date", field: "purchaseDate", sortable: true, width: 150
        },
        {
            headerName: "", width: 100,
            cellRendererFramework: () => <ButtonGroup >
                <Button bsSize="xsmall" className={styles['btn-primary-outline']} onClick={() => { }}>
                    <Glyphicon glyph="trash" />
                </Button>
                <Button bsSize="xsmall" className={styles['btn-primary-outline']} onClick={() => { }}>
                    <Glyphicon glyph="pencil" />
                </Button>

                <Button bsSize="xsmall" className={styles['btn-primary-outline']} onClick={getPDF}>
                    <FontAwesomeIcon icon={faFilePdf} />
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