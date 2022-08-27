import React from "react";
import { useState, useEffect } from "react";
import Test from "../Test/Test";

const TestsList = (props) => {
    useEffect(() => {
      setList(props.list)
    }, []);

    const [List, setList] = useState([]);
    return (
      <div className="test-list">
            {List.map((item) => (
           <Test test={item}/>
             ))}
      </div>   
        
    )
}

export default TestsList;



