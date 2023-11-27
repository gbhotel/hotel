import {createSlice} from "@reduxjs/toolkit";

//Данные для того, чтобы при запуске state не был пустым и невываливалась ошибка
const initialState = {render:'profile'} // <= 'profile', 'editData', 'editPhoto'

const profileSlice = createSlice({
    name: 'render',
    initialState: initialState,
    reducers: {
        change:(state, action)=>{
            state.render = action.payload;
            return state;
        },
    }
})

export const {change} = profileSlice.actions;   //Импортируется в компоненты
export const profileReducer = profileSlice.reducer;   //Импортируется в store

