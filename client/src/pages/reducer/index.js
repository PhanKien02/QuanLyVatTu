import { combineReducers } from "redux";
import userReducer from "./nhanVienSlide/userSlide"
import nhanvienSlide from "./nhanVienSlide/nhanVienSlide"
import khuVucSlide from "./KhuVucSlide/khuVucSlide";
const rootReducer = combineReducers ({
    user : userReducer,
    nhanvien : nhanvienSlide,
    khuVuc : khuVucSlide
})

export default rootReducer;