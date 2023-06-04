import request from "../../../../utils/httpRequesr"

const getALlVatu =async () =>{
    try {
        const res = await request.get("/api/vatus");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default {
    getALlVatu
}