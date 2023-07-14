import { combineReducers } from "redux";
import userReducer from "./nhanVienSlide/userSlide"
import nhanvienSlide from "./nhanVienSlide/nhanVienSlide"
import khuVucSlide from "./khuvuc/khuVuc"
import diaChiSlide from "./diaChiSlide/diaChiSlide";
const rootReducer = combineReducers ({
    user : userReducer,
    nhanvien : nhanvienSlide,
    khuvuc : khuVucSlide,
    diaChi : diaChiSlide,
})

export default rootReducer;