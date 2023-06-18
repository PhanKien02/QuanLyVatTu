import moment from "moment"

const formatDateToClient = (prams)=>{
    return moment(prams).format("DD-MM-YYYY");
};
export default   formatDateToClient