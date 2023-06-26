import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/User"
import ApiResult from '../configs/resultApi'
// * kiểm tra user có tồn tại trong db hay không
const checkUser = async (userName)=>{
    try {
        const UserCheck = await User.findOne({where : {userName : userName, active:true} ,include:"NhanVien"})
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
const generateToken= (data,exp) =>{
    const token=  jwt.sign({ useId: data }, process.env.PRIVATEKEY, { expiresIn: exp });
    return token
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
            password : newpassword,
            chucvuId : user.role_id,
            nhanvienId: user.nhanvienId,
            active : true      
        }
            )
        const data = new ApiResult("create user Success",newUser) 
        return res.status(200).json(data)
    }
}
const LoginUser = async (req,res)=>{
    const userLogin = await checkUser(req.body.userName);
    if(userLogin){
        try {
            const checkpass = await comparePassword(req.body.password,userLogin.password)
            if(checkpass)
                {
                    const newToken =generateToken(userLogin.id,'1m')
                    const refreshToken =generateToken(userLogin.id,'1d')
                    const User = {
                        user : userLogin,
                        token : newToken,
                    }
                    const data = new ApiResult("login success",User) 
                    return res.cookie('jwt', refreshToken, { httpOnly: true, 
                        sameSite: 'None', secure: true, 
                        maxAge: 24 * 60 * 60 * 1000 }).status(200).json(data);
                }
            else{
                const User = {
                    user : null,
                    token : null,
                }
                const data = new ApiResult("Password is incorrect",User);
                return res.status(200).json(data)
            }
        } catch (error) {
            console.log(error);
            const User = {
                user : {},
                token : "",
            }
            const data = new ApiResult("login faild",User);
            return res.status(200).json(data)
        }
    }
    else{
        const User = {
            user : {},
            token : "",
        }
        return res.status(200).json(new ApiResult("username  is incorrect",User))
    }
}
const getAllUser =  async (req,res)=>{
    await User.findAll({include :"NhanVien"}).then((users)=>{
        const data = new ApiResult("get all user success",users)
        return res.status(200).json(data)
    }).catch((err)=>{
        console.log(err);
        const data = new ApiResult("get all user faile",[])
        return res.status(500).json(data);
    });
}
export default {
    newUser,
    LoginUser,
    getAllUser
}
