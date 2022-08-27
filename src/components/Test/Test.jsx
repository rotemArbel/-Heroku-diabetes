import React from "react";
import './test.scss';

const Test = (props) => {
    const test = props.test
    // console.log(test)
    const resultColor = Number(test.result) > 130 ? 'red' : 'green';
    return (
        <div className="test-card">
            <div className="test-info">
                <div className="test-header">
                    <div className="test-date">{test.date}</div>
                    <div className="test-time">{test.time}</div>
                </div>
                <div style={{color: resultColor}} className="test-result">{test.result}</div>
            </div> 
            
        </div>
    )
}

export default Test;