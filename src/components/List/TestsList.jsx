import React from "react";
import {useState, useEffect} from "react";
import Test from "../Test/Test";
import Card from "../Card/Card";
import plus from '../../assets/square-plus-regular.svg';
import Download from '../../assets/file-arrow-down-solid.svg';
import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const TestsList = (props) => {
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

                    <div
                        className="list-container"
                        style={{
                        margin: "auto"
                    }}>
                        {List[key].map((item) => (<Test test={item}/>))}
                    </div>

                ))}
        </div>
        let doc = new jsPDF("portrait", 'px', 'A4');
        doc.html(ReactDOMServer.renderToString(el), {
            callback: () => {
                doc.save('tests.pdf');
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
                <Card img={plus} onClick={props.add} page='addTest'/>
            </div>
            <div className="swiper">

                <div className="swiper-wrapper">

                    {Object
                        .keys(List)
                        .reverse()
                        .map((key) => (

                            <div key={key} className="swiper-slide">
                                {/* {console.log(List[key])} */}
                                <h1>{key}</h1>
                                {List[key].map((item) => (<Test deleteDoc={props.deleteDoc} test={item}/>))}
                                <LineChart width={300} height={100} data={List[key]}>
                            <Line type="monotone" dataKey="result" stroke="#8884d8" />
                            {/* <CartesianGrid stroke="#ccc" /> */}
                            <XAxis dataKey="time" />
                            <YAxis domain={[0, 300]} />
                          </LineChart>
                            </div>
                            

                        ))}
                        
                </div>
            </div>
           
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>

        </div>

    )
}

export default TestsList;
