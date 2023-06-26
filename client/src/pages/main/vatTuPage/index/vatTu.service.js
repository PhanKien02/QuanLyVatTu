import request from "../../../../configs/httpRequesr"

const getALlVatu =async () =>{
    try {
        const res = await request.get("vattus");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
const SearchVatu =async (tenVatTu) =>{
    try {
        const res = await request.get(`Searchvattu?tenVatTu=${tenVatTu}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default {
    getALlVatu,SearchVatu
}