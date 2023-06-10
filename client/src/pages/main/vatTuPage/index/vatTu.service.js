import request from "../../../../utils/httpRequesr"

const getALlVatu =async () =>{
    try {
        const res = await request.get("vatus");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default {
    getALlVatu
}