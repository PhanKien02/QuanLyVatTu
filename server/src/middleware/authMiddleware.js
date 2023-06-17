import  Jwt  from "jsonwebtoken"
import ApiResult from "../configs/resultApi";

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    console.log(token);
    if(token)
    {
            const mytoken = token.split(" ")[1]
            const decode= Jwt.verify(mytoken,process.env.PRIVATEKEY);
            if(decode)
                return  next();
            else
                return res.status(401).json(new ApiResult("please log in",null))
        }
    else{
        const data = new ApiResult("token not found")
        return res.status(401).json(data)
    }
}
export default auth