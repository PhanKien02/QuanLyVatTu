import ApiResult from "../configs/resultApi";
import NhanhVien from "../models/NhanVien";
const addNhanVien = async (req,res) =>{
    const newUser = req.body;
    const user = {
        userName: newUser.userName ,
        password : newUser.password,
        chucvuId : newUser.role_id
    }
    try {
        await NhanhVien.create({
            tenNhanVien: newUser.tenNhanVien,
            ngaySinh : newUser.ngaySinh,
            gioiTinh : newUser.gioiTinh,
            mKV : newUser.mKV,
            idUser : newUser.idUser,
        })
        const data = {
            nhanhVien : NhanhVien
        }
        return res.status(200).json(new ApiResult("create Nhân viên success",data))
    } catch (error) {
        console.log(error);
        const data = {
            NhanhVien : null 
        }
        return res.status(500).json(new ApiResult("add Nhân Viên faile",data))
    }
    
} 
export default {
    addNhanVien
}