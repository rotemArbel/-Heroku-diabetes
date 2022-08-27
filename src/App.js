import React from 'react';
import './App.scss';
import Home from './components/Home/Home';
import { useState, useEffect } from "react";
import Nav from './components/Nav/Nav';
import AddMeal from './components/Forms/AddMeal';
import TestList from './components/List/TestsList';
import AddTest from './components/Forms/AddTest';
import fb from './Services/firebaseDB';
import MealsList from './components/List/MealsList';
import CombinedList from './components/List/CombinedList';





function App() {
 
  useEffect(() => { 
    setApp(); 
  },[]);

  const [state, setState] = useState({
    page: 'home',
    meals: [],
    tests: [],
    combined: [],
    listToShow: null,
    user: null,
    modal: {
      open:false,
      title: '',
      content: null
    }
  });

  const setApp =  async ()=> {
    const meals = await fb.getData('meals');
    const tests = await fb.getData('tests');
    setState({...state,meals, tests, combined:[...meals, ...tests]});

  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('service-worker.ts', {scop:'/'})
  //     .then((reg)=> {
  //       console.log(reg)
  //     });
  // }
  }
  

  const setPage = (page)=> {
    if (page !== 'list') {
      setState({...state, listToShow: null, page})
    } else {
      setState({...state, page})
    }
   
  } 

  const setList = (list)=> {
    setState({...state, listToShow: state[list]})
  } 
 
  // useMemo(async ()=> {
  // //  const fb  = new FirebaseClient();
  //  console.log( await fb.getData('meals'));
  // })

  const post = async (collectionName, data) => {
    data.user = state.user;
    // const date = data.date;
    // data.date = date.split('-').reverse().join('-');
   await fb.postData(collectionName, data);
   await setApp();
  //  const newData = await fb.getData(collectionName);
  //  if (collectionName === 'meals') {

  //  }
  //  setState({...state, collectionName:newData});
  



  }

  

  return (
    <div className="App">
      <Nav setPage={setPage} setList={setList}/>
      <div className='container'>
      {state.page === 'home' &&
        <Home setPage={setPage}/>
      }
      {state.page === 'addMeal' &&
       <AddMeal postData={post}/>
      }
       {state.page === 'addTest' &&
       <AddTest postData={post}/>
      }
       {state.page === 'testsList' &&
       <TestList list={state.tests}/>
      }
      {state.page === 'mealsList' &&
       <MealsList list={state.meals}/>
      }
      {state.page === 'combinedList' &&
       <CombinedList list={state.combined}/>
      }
      </div>
     
     
     <div className='modal-container'>

     </div>
    </div>
  );
}

export default App;
