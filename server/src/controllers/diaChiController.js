import TinhThanh from "../models/TinhThanh"
import QuanHuyen from "../models/QuanHuyen"
import XaPhuong from "../models/XaPhuong"
import ApiResult from "../configs/resultApi"
const getTinhThanh = (req,res) =>{
    TinhThanh.findAll({include:{
        model : QuanHuyen,
        as : "QuanHuyen",
        include:"XaPhuong"
    }}).then(response =>{
        return res.status(200).json(response)
    }).catch(error =>{
        console.log(error);
        return res.status(500).json({message :" error"})
    })
}
export default {
    getTinhThanh
}