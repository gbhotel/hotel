import {createSlice} from "@reduxjs/toolkit";


const initialDataState = {
}
const profileDataSlice = createSlice({
    name: 'profile',
    initialState: initialDataState,
    reducers: {
        changeData:(state, action)=>{
            state.profile = action.payload;
            return state;
        },
    }
})
export const {changeData} = profileDataSlice.actions;
export const profileDataReducer = profileDataSlice.reducer;
