import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./forms.scss";
import Loader from "../Loader/Loader";


const AddMeal = (props) => {
    const {reset, register, handleSubmit, watch, formState: {
            errors
        }} = useForm();

    const onSubmit = async (data) => {
        setLoad(true);
        const dataToSend = {};
        const items = [];
        for (const key in data) {
            if (key.includes('item')) {
                items.push(data[key]);
            } else {
                dataToSend[key] = data[key]
            }
        }
        dataToSend.items = items;
        props.postData('meals', dataToSend, props.user);
       
        reset();
    };

    const [load, setLoad] = useState(false);
    
    const [items, setItems] = useState(1);

    const [addedMeals, setAddedMeals] = useState({});
   
    const addItem = (key)=> {
        const newItem = watch();
        console.log(newItem)
        setAddedMeals(newItem)
        setItems(items + 1)
    }; 
    const removeItem = (index) => {
        const currentAddedMeals = {...addedMeals}
        console.log(currentAddedMeals);
        delete currentAddedMeals[index];
        console.log(currentAddedMeals);
        setItems(items - 1)
        setAddedMeals(currentAddedMeals);
    }

    return (
        <div className="form-container">
            {load && <Loader size="15%"/>  }
            <div style={{opacity: load ? 0 : 1}}>
            <div className="close" onClick={()=>props.close()}/>
            <h3 className="form-header">Add Meal</h3>
            <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="meal-date-time"> */}
                <label>{"Date & Time"}
                </label>
                <input {...register("date", {required: true})} type="date"/>
                <input {...register("time", {required: true})} type="time"/> {/* </div> */}
                {Array
                    .from(Array(items))
                    .map((x, index) => (
                        <div key={index} className="meal-item-add">
                            {addedMeals[index+"-item"] ? 
                              <div key={addedMeals[index+"-item"].timestamp} className={'single-item'}>
                              <div className="meal-item-name meal-item">{addedMeals[index+"-item"].name}</div>
                              <div className="meal-item-quantity meal-item">{addedMeals[index+"-item"].quantity}</div>
                              <div className="meal-item-notes meal-item">{addedMeals[index+"-item"].notes}</div>
                              <div onClick={()=>removeItem(index+"-item")}>X</div>
                          </div>
                            : <>
                            <label>Item:
                            </label>
                            <input {...register(index+"-item.name", {required: true})} type="text"/>
                            <label>Quantity:
                            </label>
                            <input {...register(index+"-item.quantity", {required: true})} type="number"/>
                            <label>Notes:
                            </label>
                            <input {...register(index+"-item.notes")} type="text"/>
                            <button onClick={() => addItem(index+"-item")}>+</button>
                            </>}
                            
                        </div>
                    ))}

                <input type="submit" value="Submit"/>
            </form>
            </div>
         
        </div>
    )
}

export default AddMeal;