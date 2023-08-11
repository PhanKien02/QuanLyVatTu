import { createSlice } from "@reduxjs/toolkit";
let getLocalState = JSON.parse(sessionStorage.getItem('auth'));
let userLogin = getLocalState ? getLocalState : {user : null,isAuth: false};

const UserSlide = createSlice({
    name:"userSlide",
    initialState : userLogin,
    reducers:{
        LOG_IN:(state,action )=> {
            state.user = action.payload.user
            state.isAuth = true
            sessionStorage.setItem("auth",JSON.stringify(state));
            sessionStorage.setItem("token",JSON.stringify({token :action.payload.token}));
        },
        LOG_OUT : (state,action) =>{
            state.user = null
            state.isAuth = false
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("token");
        },
    },
})
export const action = UserSlide.actions;
export default UserSlide.reducer;