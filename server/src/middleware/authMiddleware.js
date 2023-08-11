import Jwt from "jsonwebtoken";
import ApiResult from "../configs/resultApi";

export const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const mytoken = token.split(" ")[1];
        try {
            const verify=  Jwt.verify(mytoken, process.env.PRIVATEKEY);
            req.user = verify.id;
            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(new ApiResult("authentiacation faild", {}));
        }
    } else {
        const data = new ApiResult("token not found", {});
        return res.status(401).json(data);
    }
};
export const authorization = (req,res,next)=>{
    console.log(req.user)
    return next()
}
export const refreshToken =(req,res)=> {
    try {
        const verify= Jwt.verify(req.cookies.refreshToken, process.env.PRIVATEKEY_REFRESH);
        const newToken= Jwt.sign({id : verify.id},process.env.PRIVATEKEY,{expiresIn: "30s",algorithm:"HS256"});
        return res.status(200).json(new ApiResult("refresh token success",newToken))
    } catch (error) {
        console.log("error",error);
        return res.status(403).json(new ApiResult("refresh token faild", {}));
    }
}
export const logout = (req,res)=>{
    
}
export default authentication
