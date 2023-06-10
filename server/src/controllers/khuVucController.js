import KhuVuc from "../models/KhuVuc";
import ApiResult from "../configs/resultApi";
const getAllKhuVuc =async(req,res)=>{
    try {
        const listKhuVuc = await KhuVuc.findAll();
        const data= new ApiResult("getAll KhuVuc thành công",listKhuVuc)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        const data= new ApiResult("getAll KhuVuc thất bại",[])
        return res.status(500).json(data)
    }
}
export default {
    getAllKhuVuc
}