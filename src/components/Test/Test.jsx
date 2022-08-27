import React from "react";

const Test = (props) => {
    const test = props.test
    // console.log(test)
    return (
        <div className="test-card">
            <div className="test-info">
                <div className="test-date">{test.date}</div>
                <div className="test-time">{test.time}</div>
                <div className="test-result">{test.result}</div>
            </div> 
            
        </div>
    )
}

export default Test;