import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./forms.scss";
import Loader from "../Loader/Loader";

const AddTest = (props) => {
    const {reset, register, handleSubmit, watch, formState: {
            errors
        }} = useForm();
    
        const onSubmit = (data) => {
            setLoad(true);
        props.postData('tests', data, props.user);
        reset();
    };

    const [load, setLoad] = useState(false);
    return (
        <div className="form-container">
             {load && <Loader size="15%"/>  }
             <div style={{opacity: load ? 0 : 1}}>
            <div className="close" onClick={() => props.close()}/>
            <h3 className="form-header">Add Test</h3>
            <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                <label>{"Date & Time"}
                </label>
                <input {...register("date", {required: true})} type="date"/>
                <input {...register("time", {required: true})} type="time"/>
                <label>Result:
                </label>
                <input {...register("result", {required: true})} type="number"/>

                <input type="submit" value="Add"/>
            </form>
            </div>
        </div>
    )
}

export default AddTest;