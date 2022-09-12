import React, { createContext } from 'react';
import './App.scss';
import {useState, useEffect, useMemo} from "react";
import Nav from './components/Nav/Nav';
import AddMeal from './components/Forms/AddMeal';
import TestList from './components/List/TestsList';
import AddTest from './components/Forms/AddTest';
import {db, auth, getData, postData} from './Services/firebaseDB';
import MealsList from './components/List/MealsList';
import CombinedList from './components/List/CombinedList';
import {set} from 'react-hook-form';
import moment from 'moment';
import Login from './components/Login/Login';



function App() {
    const initialState = {
        page: null,
        meals: [],
        tests: [],
        combined: [],
        listToShow: null,
        user: null,
        userName: null,
        load: false,
        modal: {
            open: false,
            type: null
        }
    };
    // const context = createContext(initialState)
    const [state,
        setState] = useState(initialState);
    useMemo(() => {
        auth.onAuthStateChanged((user)=> {
            // user.name = 'Rotem'
            if (user) {
                console.log(user)
                setState({...state, user: user.uid , userName: user.displayName})
                auth.setPersistence('local');
            // console.log(user)
                setUser(user.uid)
                setApp('home');
            } else {
                logout();
            }
        })
       
    }, []);
 

    const setApp = async(page) => {
        const user = getCookie('user');
        if (!user) {
            setState({...state, user: null});
        } else {

        }
        let meals;
        let tests;
        meals = await getData('meals', user);
        tests = await getData('tests', user);
        setState({...state, user});
        if (page) {
            if (user) {
                const startPage = page;
                setState({
                    ...state,
                    meals,
                    tests,
                    user,
                    page: null,
                    load: true,
                    combined: sortCombined(meals, tests),
                    modal: {
                        open: false,
                        type: null
                    }
                });
             } else {
                setState({
                    ...state,
                    user,
                    page: null,
                    load: true,
                    modal: {
                        open: false,
                        type: null
                    }
                });
             }
            setState({
                ...state,
                meals,
                tests,
                user,
                page: null,
                load: true,
                combined: sortCombined(meals, tests),
                modal: {
                    open: false,
                    type: null
                }
            });
        } else {
            setState({
                ...state,
                user,
                meals,
                tests,
                combined: sortCombined(meals, tests),
                modal: {
                    open: false,
                    type: null
                }
            });
        }
      

    }

    const setUser = (user) => {
        // fb.getData('users', )
        document.cookie = "user = "+user+";";
        setApp('home');
    }

    const getCookie = (cookieName) => {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
          let [key,value] = el.split('=');
          cookie[key.trim()] = value;
        })
        return cookie[cookieName];
      }
    const sortCombined = (meals, tests) => {
        const combined = {};
        Object
            .keys(meals)
            .map((key) => {
                if (combined.hasOwnProperty(key)) {
                    combined[key] = [
                        ...combined[key],
                        ...meals[key]
                    ];
                } else {
                    combined[key] = meals[key];
                }
            })
        Object
            .keys(tests)
            .map((key) => {
                if (combined.hasOwnProperty(key)) {
                    combined[key] = [
                        ...combined[key],
                        ...tests[key]
                    ];
                } else {
                    combined[key] = tests[key];
                }
            });

        const orderedDates = {};
        Object
            .keys(combined)
            .sort(function (a, b) {
                return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
            })
            .forEach(function (key) {
                orderedDates[key] = combined[key];
            });
        Object.values(orderedDates).forEach((value)=> {
            value.sort(function (a, b) {
                var keyA = new Date(a.timestamp),
                    keyB = new Date(b.timestamp);
                // Compare the 2 dates
                if (keyA < keyB) 
                    return -1;
                if (keyA > keyB) 
                    return 1;
                return 0;
            });
        })

        return orderedDates
    }

    const setPage = (page) => {
        if (page !== 'list') {
            setState({
                ...state,
                listToShow: null,
                page
            })
        } else {
            setState({
                ...state,
                page
            })
        }

    }

    const setList = (list) => {
        setState({
            ...state,
            listToShow: state[list]
        })
    }

    const logout = ()=> {
    
        
        auth.signOut().then(()=>{
            document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        
            setState({...initialState, load:true})
        })
    }
   
    const setModal = (type) => {
        setState({...state, modal:{open:true, type}})
    }

    const onSuccess = async () => {
       await setModal('success')
    }
    const onFailed = async () => {
        await setModal('failed')
    }
    const closeModal = () => setState({...state, modal: {open: false, type:null}})

    const post = async(collectionName, data) => {
        data.user = state.user;
        const res = await postData(collectionName, data, state.user, onSuccess, onFailed);
        const page = collectionName === 'meals' ? 'mealsList' : 'testsList';
        const modal = res ? 'success' : 'failes';
        const meals = await getData('meals', state.user);
        const tests = await getData('tests', state.user);
        console.log(state)
        await setState({...state, page, meals, tests,modal: {type: modal, open:true}, combined: sortCombined(meals, tests)});
        // await setApp(page);
    }

    return (
        <>
        {state.load ? <>
            {state.user && (
            <div className="App">
            <Nav user={state.userName} setPage={setPage} setList={setList} logout={logout}/>
            <div className='container'>
                {state.page === 'home' && <CombinedList setModal={setModal} setPage={setPage} list={state.combined}/>
}
                {state.page === 'testsList' && <TestList add={setModal} list={state.tests}/>
}
                {state.page === 'mealsList' && <MealsList add={setModal} list={state.meals}/>
}
                {state.page === 'combinedList' && <CombinedList list={state.combined}/>
}
            </div>
            {state.modal.open &&
            <div className='modal-container'>
                {state.modal.type === 'addMeal' && <AddMeal postData={post} user={state.user} close={closeModal}/>
}
                {state.modal.type === 'addTest' && <AddTest postData={post} user={state.user} close={closeModal}/>
}               
                {state.modal.type === 'loading' && <div className='form-container'>loading</div>
}               
                {state.modal.type === 'success' && <div className='form-container'><div className='close' onClick={()=>closeModal()}/>success</div>
}
               {state.modal.type === 'failed' && <div className='form-container'><div className='close' onClick={()=>closeModal()}/>failed</div>
}
            </div>
            }
            
        </div>
        )}
        {!state.user &&
            <Login setUser={setUser}/>
        }
        
        </> : 'loading'}
     
        </>
        
    );
}

export default App;
