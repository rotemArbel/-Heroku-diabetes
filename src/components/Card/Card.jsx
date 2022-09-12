import React from "react";
import './card.css'; 

const Card = (props)=> {


    return (
        <div className="card" onClick={()=>{props.onClick(props.page)}}>
            <img src={props.img} className="card-img"/>
            {/* <div className="card-text">{props.text}</div>    */}
        </div>
    )
}

export default Card;