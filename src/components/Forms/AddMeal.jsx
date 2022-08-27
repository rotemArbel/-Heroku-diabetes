import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "./forms.scss";

const AddMeal = (props)=> {
    const {reset, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const dataToSend = {};
        const items = [];
        for (const key in data) {
            if (key.includes('item')) {
                items.push(data[key]);
            }else {
                dataToSend[key] = data[key]
            }
        }
        dataToSend.items = items;
        props.postData('meals', dataToSend);
        reset();
    };

    const [items, setItems] = useState(1);
    return (
        <div className="form-container">
            <h1 className="form-header">Add Meal</h1>
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="meal-date-time">
                    <label>Date: </label>
                    <input {...register("date", {required: true})} type="date" />
                    <label>Time: </label>
                    <input {...register("time", {required: true})} type="time" />
                    </div>
                    {Array.from(Array(items)).map((x, index) =>(
                        <div key={index} className="meal-item-add" >
                        <label>Item: </label>
                        <input {...register(index+"-item.name", {required: true})} type="text" />
                        <label>Quantity: </label>
                        <input {...register(index+"-item.quantity", {required: true})} type="number" />
                        <label>Notes: </label>
                    <input {...register(index+"-item.notes")} type="text"/>
                    </div>
                     ) )}
                    
                    
                    <button onClick={()=>setItems(items+1)}>Add More item</button>
                    <input type="submit" value="Submit"/>
                </form>   
        </div>
    )
}

export default AddMeal;