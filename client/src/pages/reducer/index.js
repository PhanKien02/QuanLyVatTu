import { combineReducers } from "redux";
import userReducer from "./nhanVienSlide/userSlide"
import nhanvienSlide from "./nhanVienSlide/nhanVienSlide"
const rootReducer = combineReducers ({
    user : userReducer,
    nhanvien : nhanvienSlide
})

export default rootReducer;