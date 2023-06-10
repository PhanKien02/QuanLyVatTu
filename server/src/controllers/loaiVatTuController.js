import ApiResult from '../configs/resultApi';
import LoaiVatTu from '../models/LoaiVatTu';
const getAllLoaiVatTu = async (req,res) =>{
    await LoaiVatTu.findAll().then(vatus =>{
        const result = new ApiResult("get all chung loai thanh cong",vatus)
        return res.status(200).json(result)
    }).catch(erorr=>{
        console.log(erorr);
        const result = new ApiResult(erorr,[]);
        return res.status(500).json(result);
    })
}

export default {
    getAllLoaiVatTu
}