import {configureStore} from "@reduxjs/toolkit";
import {renderReducer} from './slices/director/directorRender.js'
import {profileDataReducer} from "./slices/director/directorData.js";

export const store = configureStore({
    reducer:{
        //дописываем свои редусеры сюда
        render:renderReducer,
        profile:profileDataReducer,
    }
    //для работы экстейшенов
},window.__REDUX_DEVTOOLS_EXTENSION__&&__REDUX_DEVTOOLS_EXTENSION__())
