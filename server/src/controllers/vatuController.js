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
const createVatTu = async (req,res) =>{
    const newVT = req.body
    await VatTu.create({
        mVT: newVT.mVT,
        tenVatTu: newVT.tenVatTu,
        donViTinh: newVT.donViTinh,
        LoaiVatTuId:newVT.LoaiVatTuId,
        soLuong : newVT.soLuong,
        donGia: newVT.donGia,
        khuVucId : newVT.khuVucId
    }).then((response)=>{
        const data = new ApiResult("thêm vật tư thành công",response);
        return res.status(200).json(data);
    }).catch((error)=>{
        console.log(error);
        const data = new ApiResult("thêm vật tư thất bại",error);
        return res.status(200).json(data);
    })
}
const updateVattu = async (req,res) =>{
    const VTUpdate =req.body;
    console.log(VTUpdate);
    try {
        const Vattu= await VatTu.update({
            mVT: VTUpdate.mVT,
            tenVatTu: VTUpdate.tenVatTu,
            donViTinh: VTUpdate.donViTinh,
            LoaiVatTuId:VTUpdate.LoaiVatTuId,
            soLuong : VTUpdate.soLuong,
            donGia: VTUpdate.donGia,
            khuVucId : VTUpdate.khuVucId
        },{  where: {
            mVT : VTUpdate.mVT
        }
        });
        const data = new ApiResult("cập nhật vật tư thành công",Vattu);
        return res.status(200).json(data);
    } catch (error) {
        // console.log(error);
        const data = new ApiResult("thêm vật tư thất bại",null);
        return res.status(200).json(data);
    }
}
const deleteVattu = async (req,res) =>{
    try {
        const deleteVT =   await VatTu.destroy({ where:{mVT :req.params.mVT }});
        const data = new ApiResult("Xóa vật tư thành công",deleteVT)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        const data = new ApiResult("Xóa vật tư thất bại",error)
        return res.status(500).json(data);
    }
}
export default {
    getAllVatTu,createVatTu,updateVattu,deleteVattu
}