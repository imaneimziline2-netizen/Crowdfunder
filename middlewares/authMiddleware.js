import jwt from "jsonwebtoken";
import user from "../models/User.js"

const authMiddleware = async (req , res ,next)=>{
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message:'No token provided'});
    }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user= await user.findById(decoded.userId)
            next();
        }catch{
            res.status(401).json({message:'Invalid token'})
        }
}


export default authMiddleware;