import request from "../../../configs/httpRequesr";

const signUp = (useName,password)=>{
    request.get("/api/new-user",{
        useName:useName,
        password:password
    }).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err);
    })
};
export default signUp;