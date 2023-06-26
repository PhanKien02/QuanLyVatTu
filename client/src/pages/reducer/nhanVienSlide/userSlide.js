import { createSlice } from "@reduxjs/toolkit";
let getLocalState = JSON.parse(sessionStorage.getItem('auth'));
let userLogin = getLocalState ? getLocalState : {user : null,token : " ",isAuth: false};
const UserSlide = createSlice({
    name:"userSlide",
    initialState : userLogin,
    reducers:{
        LOG_IN:(state,action )=> {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
            sessionStorage.setItem("auth",JSON.stringify(state));
        },
        LOG_OUT : (state,action) =>{
            state.user = null
            state.token =null
            state.isAuth = false
            sessionStorage.setItem("auth",JSON.stringify(state));
        },
    }
})
export const action = UserSlide.actions;
export default UserSlide.reducer;