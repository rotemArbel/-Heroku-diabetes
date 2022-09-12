import React from "react";
import { useState, useEffect } from "react";
import Meal from "../Meal/Meal";
import Test from "../Test/Test";
import Swiper, {Navigation} from 'swiper';
import Card from "../Card/Card";
import meal from '../../assets/meal.svg';
import test from '../../assets/test.svg';
import Download from '../../assets/file-arrow-down-solid.svg';
import 'swiper/css';
import 'swiper/css/navigation';import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";


const CombinedList = (props) => {
    useEffect(() => {
      setList(props.list)
    }, []);

    const [List, setList] = useState([]);

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
                              <h1>{key}</h1>
                              {List[key].map((item) => (
                                <>
                                   {item.type === 'meals' ? <Meal meal={item}/> : <Test test={item}/>}
                                </>
                              ))}
                          </div>

                      ))}
        </div>
        let doc = new jsPDF("portrait", 'px', 'A4');
        doc.addFont('system-ui');
        doc.setFont('system-ui');
        doc.html(ReactDOMServer.renderToString(el), {
            callback: () => {
                doc.save('combined.pdf');
            }
        });
    }

    const swiper = new Swiper('.swiper', {
      modules: [
          Navigation
      ],

      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
      }
  });
  return (
      <div className="list-container">
           <div className="add-btns">
                <Card text="Add Meal" img={meal} onClick={props.setPage} page='mealsList'/>
                <Card text="Add Test" img={test} onClick={props.setPage} page='testsList'/>
                <Card img={Download} onClick={download}/>
            
            </div>
          <div className="swiper">

              <div className="swiper-wrapper">

                  {Object
                      .keys(List)
                      .reverse()
                      .map((key, value) => (

                          <div className="swiper-slide">
                              <h1>{key}</h1>
                              {List[key].map((item) => (
                                <>
                                   {item.type === 'meals' ? <Meal meal={item}/> : <Test test={item}/>}
                                </>
                              ))}
                          </div>

                      ))}
              </div>
          </div>
          {/* <div className="swiper-pagination"></div> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
      </div>
  )
    // return (
    //   <div className="test-list">
    //         {List.map((item) => (
    //         <div>
    //             {item.type === 'meals' ? <Meal meal={item}/> : <Test test={item}/>}
    //         </div>
           
    //          ))}
    //   </div>   
        
    // )
}

export default CombinedList;



