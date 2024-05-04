import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth= async (req, res, next)=>{
    let token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(403).json({
            code:403,
            message:'Invalid username or password'
        })
    }

    const decodedToken = await jwt.verify(token,'Secret');
    console.log(decodedToken);
    const user= await User.findById(decodedToken.id);
    console.log(user);
    if(!user){
        return res.status(400).json({
            message:"User is no longer exist"
        })
    }
    req.userId=user._id;
    next()
}

