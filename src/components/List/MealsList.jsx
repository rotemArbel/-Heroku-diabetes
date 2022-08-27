import React from "react";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";

const MealsList = (props) => {
    useEffect(() => {
      setList(props.list)
    }, []);

    const [List, setList] = useState([]);
    return (
<div>
{List.map((item) => (
    <>
    <Meal key={item.timestamp} meal={item}></Meal>
    </>
    
))}
</div>
                  
    )
}

export default MealsList;



