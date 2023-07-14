import fs from "fs";
import ApiResult from "../configs/resultApi";
import NhanhVien from "../models/NhanVien";
import User from "../models/User";
import XaPhuong from "../models/XaPhuong"
import QuanHuyen from "../models/QuanHuyen"
import TinhThanh from "../models/TinhThanh"
const addNhanVien = async (req, res) => {
    const newUser = req.body;
    try {
        const nhanVien = await NhanhVien.create({
            tenNhanVien: newUser.tenNhanVien,
            email: newUser.email,
            ngaySinh: newUser.ngaySinh,
            soDienThoai: newUser.soDienThoai,
            gioiTinh: newUser.gioiTinh,
            mKV: newUser.mKV,
            userId: newUser.idUser,
            avatar: newUser.avatar,
            active: 1,
        });
        return res
            .status(200)
            .json(new ApiResult("create Nhân viên success", nhanVien));
    } catch (error) {
        console.log(error);
        return res.status(200).json(new ApiResult("add Nhân Viên faile", null));
    }
};
const getALlNhanVien = async (req, res) => {
    await NhanhVien.findAll({ include: ["KhuVuc", "XaPhuong", "User"] })
        .then((nhanviens) => {
            console.log(nhanviens);
            return res
                .status(200)
                .json(new ApiResult("get all nhanvien success", nhanviens));
        })
        .catch((err) => {
            console.log(err);
            return res
                .json(200)
                .json(new ApiResult("get all nhan vien faild", []));
        });
};
const getNhanVienById = async (req, res) => {
    await NhanhVien.findByPk(req.query.id, {
        include: [
            {
                model: User,
                as: "User",
                attributes: ["userName", "active"],
                include: ["ChucVu"],
            },
            "KhuVuc",
            {
                model: XaPhuong,
                as :"XaPhuong",
                include:{
                    model : QuanHuyen,
                    as :"QuanHuyen",
                    include :{
                        model : TinhThanh,
                        as : "TinhThanh"
                    }
                }
            }
        ],
    })
        .then((nhanvien) => {
            return res
                .status(200)
                .json(new ApiResult("get nhanvien by Id success", nhanvien));
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(200)
                .json(new ApiResult("get nhanvien by Id faild", []));
        });
};
const uploadAvatar = (req,res)=>{
    const newavatar = `${process.env.BASE_URL}export/${req.file.filename}`
        NhanhVien.update({avatar: newavatar},{where:{mNV : req.body.mNV}}).then(response=>{
        return res.status(200).json(new ApiResult("Upload avatar thành công",response))
    }).catch(error=>{
        console.log(error);
        fs.unlink(`./${req.file.path}`)
        return res.status(200).json(new ApiResult("Upload avatar thất bại",{}))
    })
}
export default {
    addNhanVien,
    getALlNhanVien,
    getNhanVienById,
    uploadAvatar
};
