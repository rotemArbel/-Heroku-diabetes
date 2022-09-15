import React from "react";
import './loader.scss';

const Loader = (props) => (
    <div className="loader-container" >
        <div className="loader" style={{width: props.size, height: props.size}}>

        </div>
    </div>
)

export default Loader;
