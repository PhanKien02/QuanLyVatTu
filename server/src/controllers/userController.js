import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User"
import ApiResult from '../configs/resultApi'
// * kiểm tra user có tồn tại trong db hay không
const checkUser = async (userName)=>{
    try {
        const UserCheck = await User.findOne({where : {userName : userName}})
        if(UserCheck)
            return UserCheck;
        else
            return null;
    } catch (error) {
        console.log(error);
    }
}
const hashPassWord = (password)=>{
    const saltRounds = 10;
    try {
        const pass=  bcryptjs.hash(password, saltRounds);
        return pass
    } catch (error) {
        console.log(error);
    }
}
const comparePassword = (password,hashedPassword)=>{
    try {
        const checkpass=  bcryptjs.compare(password, hashedPassword)
        return checkpass;
    } catch (error) {
        console.log(error);
    }
}
const newUser = async (req,res)=>{
    
    const user = req.body;
    console.log(user);
    const check = await checkUser(user.userName);
    if(check)
        {
            return res.status(500).json("user name ...")
        }
    else {
        const newpassword = await hashPassWord(user.password)
        const newUser = await User.create({
            userName: user.userName ,
            password : newpassword}
            )
        const data = new ApiResult("create user Success",newUser) 
        return res.status(200).json(data)
    }
}
const LoginUser = async (req,res)=>{
    console.log("cookies: ",typeof(req.body));
    const useLogin = await checkUser(req.body.useName);
    if(useLogin){
        try {
            const checkpass = await comparePassword(req.body.password,useLogin.password)
            console.log("checkpass",checkpass);
            if(checkpass)
                {
                    const newToken =jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), useId: useLogin.id }, process.env.PRIVATEKEY);
                    const User = {
                        user : useLogin,
                        token : newToken,
                        message: "login success"
                    }
                    const data = new ApiResult("login success",User) 
                    return res.status(200).json(data);
                }
            else{
                const User = {
                    user : null,
                    token : null,
                    message: " Password is incorrect"
                }
                return res.json(User)
            }
        } catch (error) {
            console.log(error);
            const User = {
                user : null,
                token : null,
                message: "login faild"
            }
            return res.json(User)
        }
    }
    else{
        const User = {
            user : null,
            token : null,
            message: "username  is incorrect"
        }
        return res.json(User)
    }
}
const getAllUser =  async (req,res)=>{
    await User.findAll().then((users)=>{
        const  listUser = {
            message: "getAll user",
            data: users, 
        }
        return res.status(200).json(listUser)
    });


}
export default {
    newUser,
    LoginUser,
    getAllUser
}
