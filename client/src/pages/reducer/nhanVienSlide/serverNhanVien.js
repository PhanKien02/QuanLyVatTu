import request from "../../../configs/httpRequesr";

const getAllNhanVien = async () => {
    try {
        const response = await request.get("nhanviens");
        return response.data;
    } catch (error) {console.log(error);}
};
const getNhanVienById = async (id) => {
    try {
        const response = await request.get(`/nhanvien?id=${id}`);
        return response.data;
    } catch (error) {console.log(error);}
};
const addNhanVien = async (Entity) => {
    try {
        const response = await request.post("nhanvien",Entity);
        return response.data;
    } catch (error) {console.log(error);}
};
const updateNhanVien = async () => {
    try {
        const response = await request.get("nhanviens");
        return response.data;
    } catch (error) {console.log(error);}
};
const deleteNhanVien = async () => {
    try {
        const response = await request.get("nhanviens");
        return response.data;
    } catch (error) {console.log(error);}
};
const uploadAvatar = async(avatar,mNV) =>{
    try {
        const response=  await request.post("avatar",{
            mNV : mNV,
            avatar : avatar
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}
const setAciveStaff = async ({active,mNV}) =>{
    console.log({active:active,mNV:mNV});
    await request.post("active",{active:active,mNV:mNV}).then((response)=>{
        return response
    }).catch (err =>{
        console.log(err);
    })
}
export default { getAllNhanVien,getNhanVienById,addNhanVien,deleteNhanVien,updateNhanVien,uploadAvatar,setAciveStaff}
