import ApiResult from "../configs/resultApi";
import XuatKho from"../models/PhieuXuatKho";
const getAllPhieuXuatKho = (req,res)=>{
        XuatKho.findAll().then(res =>{
                return new ApiResult("get all phieu xuat kho thanh cong",res)
        })
}