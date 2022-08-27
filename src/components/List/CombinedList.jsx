import React from "react";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";
import Test from "../Test/Test";

const CombinedList = (props) => {
    useEffect(() => {
      setList(props.list)
    }, []);

    const [List, setList] = useState([]);
    return (
      <div className="test-list">
            {List.map((item) => (
            <div>
                {item.type === 'meals' ? <Meal meal={item}/> : <Test test={item}/>}
            </div>
           
             ))}
      </div>   
        
    )
}

export default CombinedList;



