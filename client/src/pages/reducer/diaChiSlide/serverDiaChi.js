import request from "../../../configs/httpRequesr";

export const getDiaChi = async () =>{
    try {
        const response= await request.get("diachi")
        return response        
    } catch (error) {
        console.log(error);
    }
}