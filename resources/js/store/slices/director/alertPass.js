import {createSlice} from "@reduxjs/toolkit";


const initialAlertPassState = {
    condition: false,
    message: ''
}
const alertPassSlice = createSlice({
    name: 'alertPass',
    initialState: initialAlertPassState,
    reducers: {
        establishAlertPass:(state, action)=>{
            state = action.payload;
            return state;
        },
    }
})
export const {establishAlertPass } = alertPassSlice.actions;
export const alertPassReducer = alertPassSlice.reducer;
