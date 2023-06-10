import ChungLoaiVatTu from "../models/ChungLoaiVatTu"
import ApiResult from "../configs/resultApi";
const getALlLoaiVatTu = async (req,res) =>{
    try {
        const ListChungLoai = await ChungLoaiVatTu.findAll({include :"LoaiVatTu"});
        const data = new ApiResult("get all ChungLoai thành công",ListChungLoai);
        return res.status(200).json(data);
    } catch (error) {
        const data = new ApiResult("get all ChungLoai thất bại",[]);
        return res.status(500).json(data);
    }
}
export default {
    getALlLoaiVatTu
}
