import React from "react";
import './meal.scss';

const Meal = (props) => {
    const meal = props.meal
    return (
        <div key={props.key} className="meal-card">
            <div className="meal-header">
                <div className="meal-date">{meal.date}</div>
                <div className="meal-time">{meal.time}</div>
            </div> 
            
            <div className="meal-items">
            <div className="items-header">
                <div>Item</div>
                <div >Quantity</div>
                <div>Notes</div>
            </div> 
                {meal.items.map((item)=> (
                    <div key={item.timestamp} className={'single-item'}>
                        <div className="meal-item-name meal-item">{item.name}</div>
                        <div className="meal-item-quantity meal-item">{item.quantity}</div>
                        <div className="meal-item-notes meal-item">{item.notes}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Meal;