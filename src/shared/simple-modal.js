import React from 'react';

function SimpleModal(props) {
    
    let modalVisibility = "modal fade";
    let modalStyle = {display: 'none', opacity:0};
    if (props.show) {
        modalVisibility = "modal"
        modalStyle = {display: 'block', opacity:1};
    }
    return (
        <div id={props.elementId} style={modalStyle} className={modalVisibility} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={props.onClose} data-dismiss="modal"><span>&times;</span></button>
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    <div className="modal-body" style={{height: "250px", overflowY: "scroll"}}>
                        {props.children}
                    </div>
                </div>
            </div>
       </div>        
    );
}

export default SimpleModal;