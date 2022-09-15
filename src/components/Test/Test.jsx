import React from "react";
import './test.scss';

const Test = (props) => {
    const test = props.test
    const resultColor = Number(test.result) > 130 ? 'red' : 'green';
    const deleteObj = (collection, id)=> {
        return {
            type: "confirm",
            data: {
                collection,
                id
            }
            
        }
    };
    return (
        <div key={test.id} className="test-card">
            <div className="test-info">
                <div className="test-header">
                    <div className="test-date">{test.date}</div>
                    <div className="test-time">{test.time}</div>
                </div>
                <div style={{color: resultColor}} className="test-result">{test.result}</div>
                {props.deleteDoc &&
                <div className="delete" onClick={()=> props.deleteDoc("message",deleteObj('tests',test.id))}/>
                }
            </div> 
           
        </div>
    )
}

export default Test;