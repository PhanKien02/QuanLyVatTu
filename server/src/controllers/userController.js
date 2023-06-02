import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User"
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
            return res.status(400).json("user name ")
        }
    else {
        const newpassword = await hashPassWord(user.password)
        const newUser = await User.create({
            userName: user.userName ,
            password : newpassword}
            )
        const User = {
            message : "create user Success",
            data : newUser
        }
        console.log(newUser);
        return res.status(200).json(User)
    }
}
const LoginUser = async (req,res)=>{
    console.log("header: ",req.headers);
    console.log("cookies: ",req.cookies);
    const useLogin = await checkUser(req.body.userName);
    if(useLogin){
        try {
            const checkpass = await comparePassword(req.body.password,useLogin.password)
            console.log("checkpass",checkpass);
            if(checkpass)
                {
                    const newToken =jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), useId: useLogin.id }, process.env.PRIVATEKEY);
                    const User = {
                        user : useLogin,
                        token : newToken
                    }
                    return res.status(200).json(User);
                }
            else{
                return res.json("username or Password is incorrect")
            }
        } catch (error) {
            console.log(error);
        }
    }
    else{
        return res.json("username or Password is incorrect")
    }
}
export default {
    newUser,
    LoginUser
}
