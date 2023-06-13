import request from "../../../../utils/httpRequesr";

const DeleteVattu = async (mvt)=>{
        try {
            const response = await request.delete(`deletevattu/${mvt}`);
            return response;
        } catch (error) {
            return error
        }
    };
export default {DeleteVattu}