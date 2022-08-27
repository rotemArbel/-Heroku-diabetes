import React from "react";
import { useForm } from "react-hook-form";
import "./forms.scss";

const AddTest = (props)=> {
    const {reset, register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        props.postData('tests', data);
        reset();
    };
    return (
        <div className="form-container">
            <h1 className="form-header">Add Test</h1>
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    <label>{"Date & Time"} </label>
                    <input {...register("date", {required: true})} type="date" />
                    <input {...register("time", {required: true})} type="time" />
                    <label>Result: </label>
                    <input {...register("result", {required: true})} type="number" />

                    <input type="submit" value="Add"/>
                </form>   
        </div>
    )
}

export default AddTest;