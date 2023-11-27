import {configureStore} from "@reduxjs/toolkit";
import {profileReducer} from './slices/slices.js'

export const store = configureStore({
    reducer:{
        //дописываем свои редусеры сюда
        profile:profileReducer,
    }
    //для работы экстейшенов
},window.__REDUX_DEVTOOLS_EXTENSION__&&__REDUX_DEVTOOLS_EXTENSION__())
