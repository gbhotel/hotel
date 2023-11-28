import {createSlice} from "@reduxjs/toolkit";


const initialDataState = {
    // id:1,
    // first_name:'name',
    // last_name:'name',
    // birthdayAt:"01.01.2000",
    // age:"0г.",
    // createdAt:"01.01.2000",
    // email:"user00@htl.ru",
    // employment:"01.01.2000",
    // experience:"0 г. 0м. 0д.",
    // gender:"м",
    // passport:"000000",
    // phone:"00000000000",
    // photo:"",
    // position:"сотрудник",
    // role_id:1,
    // updatedAt:"01.01.2000",
    // username:"user"
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
