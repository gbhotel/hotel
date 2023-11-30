import {createSlice} from "@reduxjs/toolkit";

//Данные для того, чтобы при запуске state не был пустым и невываливалась ошибка
const initialState = {render:'profile'} // <= 'profile', 'editData', 'editPhoto', 'editPass'

const renderSlice = createSlice({
    name: 'render',
    initialState: initialState,
    reducers: {
        changeRender:(state, action)=>{
            state.render = action.payload;
            return state;
        },
    }
})

export const {changeRender} = renderSlice.actions;   //Импортируется в компоненты
export const renderReducer = renderSlice.reducer;   //Импортируется в store
