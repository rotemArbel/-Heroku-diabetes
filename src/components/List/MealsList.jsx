import React from "react";
import {useState, useEffect} from "react";
import Meal from "../Meal/Meal";
import Swiper, {Navigation} from 'swiper';
import Card from "../Card/Card";
import plus from '../../assets/square-plus-regular.svg';
import Download from '../../assets/file-arrow-down-solid.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";

const MealsList = (props) => {
    useEffect(() => {
        setList(props.list)
    }, [props.list]);

    const [List,
        setList] = useState([]);

    const download = () => {
        const el = <div
            className="pdf"
            style={{
            width: "100vw",
            fontSize: "10px"
        }}>
            {Object
                .keys(List)
                .reverse()
                .map((key, value) => (
                    <div className="list-container">
                        {List[key].map((item) => (
                            <Meal key={item.timestamp} meal={item}></Meal>
                        ))}
                    </div>

                ))}
        </div>
        let doc = new jsPDF("portrait", 'px', 'A4');
        doc.addFont('system-ui');
        doc.setFont('system-ui');
        doc.html(ReactDOMServer.renderToString(el), {
            callback: () => {
                doc.save('meals.pdf');
            }
        });
    }

    const swiper = new Swiper('.swiper', {
        modules: [Navigation],

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    return (
        <div className="list-container">
            <div className="add-btns">
                <Card img={Download} onClick={download}/>
                <Card text="Add Meal" img={plus} onClick={props.add} page='addMeal'/>
            </div>
            <div className="swiper">

                <div className="swiper-wrapper">

                    {Object
                        .keys(List)
                        .reverse()
                        .map((key, value) => (

                            <div key={Math.random()} className="swiper-slide">
                                <h1>{key}</h1>
                                {List[key].map((item) => (
                                    <Meal key={item.timestamp} meal={item}></Meal>
                                ))}
                            </div>

                        ))}
                </div>
            </div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    )
}

export default MealsList;

{/*
       <h1>{key}</h1>

       { List[key].map((item) => (
 <Meal key={item.timestamp} meal={item}></Meal>
       ))} */
}
