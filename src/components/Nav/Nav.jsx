import React from "react"; 
import './nav.scss';

const Nav = (props)=> {

    return (
        <div className="nav">
           <div onClick={()=> {props.setPage('home')}} className="home-btn"/>
           <div className="user">{props.user}</div>
           <div className="logout" onClick={()=>props.logout()}/>
        </div>
    )
}

export default Nav;