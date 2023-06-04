import VatTu  from "../models/VatTu";
import ApiResult from "../configs/resultApi"
const getAllVatTu = async (req,res)=>{
    await VatTu.findAll({include:["LoaiVatTu","KhuVuc"]}).then(vatTus =>{
        const response= new  ApiResult("get all vattu success",vatTus)
        return  res.status(200).json(response)
    }).catch(err =>{
        console.log(err);
        return res.status(500).json({message: "get all vatu faild"})
    })
}
export default {
    getAllVatTu
}