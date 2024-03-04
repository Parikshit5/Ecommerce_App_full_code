import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected route token base

export const requireSignIn=async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Authorization token is missing"
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);        
        req.user = decode;
        // console.log(req.user)
        next();        
    } catch (error) {
        console.log(error)
    }
}


//admin access 
export const isAdmin=async(req,res,next)=>{
    try {
        //  console.log(req.user.id)
        const user=await userModel.findById(req.user._id)
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found"
            });
        }
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorized Access"
            })
        }else{
            next()
        }
        
    } catch (error) {
        console.log(error),
        res.status(401).send({
            success:false,
            error,
            message:'Error in Admin Middleware',
        });
    }
}