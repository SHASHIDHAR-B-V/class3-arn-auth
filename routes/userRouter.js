import {Router} from 'express'
import {register,login, forgotPassword, resetPassword, getUsers} from '../controllers/userController.js';

let userRouter= Router();

userRouter.get('/register',getUsers)
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/forgotpassword', forgotPassword)
userRouter.patch('/resetpassword/:token', resetPassword)




export default userRouter;