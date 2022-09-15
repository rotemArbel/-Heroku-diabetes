import React, { createContext } from 'react';
import './App.scss';
import {useState, useEffect, useMemo} from "react";
import Nav from './components/Nav/Nav';
import AddMeal from './components/Forms/AddMeal';
import TestList from './components/List/TestsList';
import AddTest from './components/Forms/AddTest';
import {db, auth, getData, postData, deleteDocument, getAllData} from './Services/firebaseDB';
import MealsList from './components/List/MealsList';
import CombinedList from './components/List/CombinedList';
import {set} from 'react-hook-form';
import moment from 'moment';
import Login from './components/Login/Login';
// import { store } from './redux/store';
import {  setAll } from './redux/dataState';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './components/Loader/Loader';
import MessageModal from './components/Modal/MessageModal';


function App() {
    const initialState = {
        page: null,
        user: null,
        load: false,
        modal: {
            open: false,
            type: null,
            content: null
        }
    };
   
    const [state, setState] = useState(initialState);
   
    const dataState = useSelector((state)=> {
        return state['data'];
    })

    let {data} = dataState;

    let dispatch = useDispatch()
   
    useEffect(() => {
        auth.onAuthStateChanged( async (user)=> {
            if (user) {
                const newData = await getAllData(user.uid);
                dispatch(setAll(newData))
                setApp('home', user);
            } else {
                logout();
            }
        })
    }, []);
 

    const refreshData = async (state)=> {
        const newData = await getAllData(state.user.uid);
        dispatch(setAll(newData))
        setState(state);
    }

    const setApp = async(page , userObj=null) => {
        if (!userObj) {
            setState({...state, user: null, load:true});
        } else {           
            const startPage = page ? page : 'home';
            setState({
                ...state,
                user: userObj,
                page: startPage,
                load: true,
                modal: {
                    open: false,
                    type: null,
                    content: null
                },
            });       
        }
          
    }
     

    const deletById = async (collectionName, id)=> {
        await deleteDocument(collectionName, id);
        await refreshData({...state, modal: {
            open: false,
            type: null,
            content: null
        }});
    }

    const setPage = (page) => {
        setState({
            ...state,
            page
        })
    }

    const logout = ()=> {     
        auth.signOut().then(()=>{
            setState({...initialState, load:true})
        })
    }
   
    const setModal = (type, content = null) => {
        setState({...state, modal:{open:true, type, content}})
    }

    const closeModal = () => setState({...state, modal: {open: false, type:null, content: null}})

    const post = async(collectionName, data) => {
        data.user = state.user;
        const res = await postData(collectionName, data, state.user.uid);
        const page = collectionName === 'meals' ? 'mealsList' : 'testsList';
        const modal = res ? 'success' : 'failed';
        const newState = {...state, page,modal: {type: 'message', open:true, content: {type:modal}}};
        await refreshData(newState);
    }

    return (
        <>
        {state.load && dataState ? <>
        {console.log(dataState.combined)}
            {state.user && (
            <div className="App">
            <Nav user={state.user.displayName} setPage={setPage}  logout={logout}/>
            <div className='container'>
                {state.page === 'home' && <CombinedList deleteDoc={setModal} setModal={setModal} setPage={setPage} list={dataState.combined}/>
}
                {state.page === 'testsList' && <TestList deleteDoc={setModal} add={setModal} list={dataState.tests}/>
}
                {state.page === 'mealsList' && <MealsList deleteDoc={setModal} add={setModal} list={dataState.meals}/>
}
            </div>
            {state.modal.open &&
            <div className='modal-container'>
                {state.modal.type === 'addMeal' && <AddMeal postData={post} user={state.user} close={closeModal}/>
}
                {state.modal.type === 'addTest' && <AddTest postData={post} user={state.user} close={closeModal}/>
}               
                {state.modal.type === 'message' && <MessageModal content={state.modal.content.type} data={state.modal.content.data ? state.modal.content.data : null} delete={deletById} close={closeModal} />
}
               {/* {state.modal.type === 'failed' && <div className='form-container'><div className='close' onClick={()=>closeModal()}  />failed</div> */}
{/* } */}
            </div>
            }
            
        </div>
        )}
        {!state.user &&
            <Login />
        }
        
        </> : <Loader size={'15%'}/>}
     
        </>
        
    );
}

export default App;
