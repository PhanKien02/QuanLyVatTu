import request from "../../../configs/httpRequesr";

export const getAllKhuVuc = async () =>{
    try {
        const res= await request.get("khuvucs");
        return res.data
    } catch (error) {
        console.log(error);
    }
}
