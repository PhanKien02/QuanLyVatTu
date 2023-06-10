import request from "../../../../utils/httpRequesr"
const getALLChungLoai = async () =>{
    try {
        const res =await request.get("chungLoais");
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
export default {
    getALLChungLoai,getAllKhuVuc
}
