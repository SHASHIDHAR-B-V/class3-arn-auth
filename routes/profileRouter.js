import {Router} from 'express'
import { auth } from '../Middlewares/authMiddleware.js';
import User from '../models/User.js';


let profileRouter= Router();

profileRouter.get('/home', auth, async(req,res,next)=>{
    const user= await User.findById(req.userId)
    res.send('hey i am ' + user.name)
    
    res.send('welcome to home page')
})





export default profileRouter;