import {configureStore} from "@reduxjs/toolkit";
import {renderReducer} from './slices/director/directorRender.js'
import {profileDataReducer} from "./slices/director/directorData.js";
import {alertPassReducer} from "./slices/director/alertPass.js";
import setRoomInfoForGuestReducer from "./reducers/guest_reducers.jsx"

export const store = configureStore({
    reducer:{
        //дописываем свои редусеры сюда
        render:renderReducer,
        profile:profileDataReducer,
        alertPass:alertPassReducer,
        setRoomInfoForGuest:setRoomInfoForGuestReducer,
    }
    //для работы экстейшенов
},window.__REDUX_DEVTOOLS_EXTENSION__&&__REDUX_DEVTOOLS_EXTENSION__())
