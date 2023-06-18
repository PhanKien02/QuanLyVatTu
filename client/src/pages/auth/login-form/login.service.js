import request from "../../../utils/httpRequesr"

const getAllUser = () =>{
    request.get("/api/users").then(response =>{
        return response.data
}).catch(err =>{
    console.log(err);
    return err
})
}
const Login = async (userName,password)=>{
    try {
        const log = await request.post("login",{
            userName : userName,
            password : password,
        })
        return log.data;
    } catch (error) {
        console.log(error);
        return error
    }
}
export default {
    getAllUser,
    Login
}