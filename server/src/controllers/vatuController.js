import VatTu  from "../models/VatTu";
import ApiResult from "../configs/resultApi"
const getAllVatTu = async (req,res)=>{
    await VatTu.findAll({include:["LoaiVatTu","KhuVuc"]}).then(vatTus =>{
        const response= new  ApiResult("get all vattu success",vatTus)
        return  res.status(200).json(response)
    }).catch(err =>{
        console.log(err);
        const response= new  ApiResult("get all vattu success",[])
        return  res.status(200).json(response)
    })
}
const addVatTu = async (req,res) =>{
    const newVT = req.body
    await VatTu.create({
        mVT: newVT.maVatTu,
        tenVatTu: newVT.tenVatTu,
        donViTinh: newVT.donViTinh,
        LoaiVatTuId:newVT.loaiVattu,
        soLuong : newVT.soLuong,
        donGia: newVT.dongia,
        khuVucId : newVT.khuvuc
    }).then((res)=>{
        const data = new ApiResult("thêm vật tư thành công",res);
        return res.status(200).json(data);
    }).catch((error)=>{
        console.log(error);
        const data = new ApiResult("thêm vật tư thất bại",null);
        return res.status(200).json(data);
    })
}
export default {
    getAllVatTu,addVatTu
}