import React from "react"; 
import Card from "../Card/Card";
import meal from './meal.jpg';
import test from './test.jpg';
const Home = (props)=> {


    return (
        <div className="home-container">
           <Card text="Add Meal" img={meal} onClick={props.setPage} page='addMeal'/>
           <Card text="Add Test" img={test} onClick={props.setPage} page='addTest'/>
        </div>
    )
}

export default Home;