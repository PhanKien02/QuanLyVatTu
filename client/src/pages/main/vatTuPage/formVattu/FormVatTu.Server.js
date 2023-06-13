import request from "../../../../utils/httpRequesr"
const getALLChungLoai = async () =>{
    try {
        const res =await request.get("chungLoais");
        return res.data
    } catch (error) {
        console.log(error);
    }
}
const getALLLoaiVatTu = async () =>{
    try {
        const res =await request.get("loais");
        return res.data
    } catch (error) {
        console.log(error);
    }
}
const getAllKhuVuc = async () =>{
    try {
        const res= await request.get("khuvucs");
        return res.data
    } catch (error) {
        console.log(error);
    }
}
const updateVattu = async (payload) =>{
    try {
        const res = await request.put("updatevattu",payload)
        if(res.data)
            return res.data
    } catch (error) {
        console.log(error);
    }
}
const createVattu = async (payload)=>{
    try {
        const res = await request.post("createvattu",payload)
        console.log(res);
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export default {
    getALLChungLoai,getAllKhuVuc,getALLLoaiVatTu,updateVattu,createVattu
}
