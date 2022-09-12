import React, {useEffect, useState} from "react";
import Card from "../Card/Card";
import CombinedList from "../List/CombinedList";
import meal from '../../assets/meal.svg';
import test from '../../assets/test.svg';
import './home.scss';

const Home = (props) => {
    useEffect(() => {
        setList(props.list)
    }, []);
    const [List,
        setList] = useState([]);

    return (
        <div className="home-container">
            {/* <div className="add-btns">
                <Card text="Add Meal" img={meal} onClick={props.setPage} page='mealsList'/>
                <Card text="Add Test" img={test} onClick={props.setPage} page='testsList'/>
            </div> */}
            <CombinedList list={props.list}/>
        </div>
    )
}

export default Home;