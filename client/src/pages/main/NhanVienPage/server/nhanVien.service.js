import request from "../../../../utils/httpRequesr"

const getAllUser = async () =>{
    try {
        const response = await request.get("users")
        return response.data
    } catch (error) {
        console.log(error);
        return error;
    }
    
}
export default {
    getAllUser
}