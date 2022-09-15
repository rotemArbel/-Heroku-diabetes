import React from "react";
import "./messageModal.scss";

const MessageModal = (props) => {


    return (
        <div className='form-container'><div className='close' onClick={()=>props.close()}/>
            {props.content === 'success' && 
            <div className="success">
                <h3>Record added successfully</h3>
            </div>
            }
            {props.content === 'failed' && 
            <div className="failed">
                <h3>Failed to add record</h3>
            </div>
            }
            {props.content === 'confirm' && 
            <div className="confirm">
                <h3>Are you sure you want to delete?</h3>
                <div className="btn-con">
                    <button onClick={()=>props.close()} className="no">NO</button>
                    <button onClick={()=>props.delete(props.data.collection ,props.data.id)} className="yes">YES</button>
                </div>
            </div>
            }
        </div>
    )
};

export default MessageModal;