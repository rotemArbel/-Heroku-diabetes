import React from "react"; 
import { useState } from "react";
import './nav.scss';

const Nav = (props)=> {

    
    const [showMenu, setShowMenu] = useState(false);

    const goToList = (list)=> {
        // props.setList(list);
        console.log('12')
        setShowMenu(!showMenu)
        props.setPage(list)
    }

    return (
        <div className="nav">
           <div onClick={()=> {props.setPage('home')}} className="home-btn"/>
           <div className="menu" onClick={()=>setShowMenu(!showMenu)}/>
           {showMenu && 
           <ul className="menu-list">
               <li className="menu-item" onClick={()=>{goToList('testsList')}}>tests</li>
               <li className="menu-item" onClick={()=>{goToList('mealsList')}}>meals</li>
               <li className="menu-item" onClick={()=>{goToList('combinedList')}}>combined</li>
           </ul>
           }
        </div>
    )
}

export default Nav;