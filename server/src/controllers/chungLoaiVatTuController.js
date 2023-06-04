import LoaiVatTu from "../models/LoaiVatTu"

const getALlLoaiVatTu = async () =>{
    const ListChungLoai = await ChungLoaiVatTu.findAll({include :"LoaiVatTu"});
    return {
        message: " "
    }
}