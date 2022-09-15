import React from "react";
import './meal.scss';

const Meal = (props) => {
    const meal = props.meal
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
        <div key={meal.id} className="meal-card">
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
                    <div key={item.id} className={'single-item'}>
                        <div className="meal-item-name meal-item">{item.name}</div>
                        <div className="meal-item-quantity meal-item">{item.quantity}</div>
                        {item.notes.lenght > 0 &&
                        <div className="meal-item-notes meal-item">{item.notes}</div>
                }
                    </div>
                ))}
            </div>
            {props.deleteDoc &&
            <div className="delete" onClick={()=> props.deleteDoc("message",deleteObj('meals',meal.id))}/>
            }
        </div>
    )
}

export default Meal;