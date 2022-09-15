import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    meals:null,
    tests:null,
    combined :null
}

let dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setAll: (state, action) => {
            state.meals = action.payload.meals;
            state.tests = action.payload.tests;
            state.combined = action.payload.combined;   
        },
        setMeals: (state, action) => {
            state.meals = action.payload;
        },
        setTests: (state, action) => {
            state.meals = action.payload;
        }
    },
})




export const {setAll} = dataSlice.actions;
export default dataSlice.reducer;