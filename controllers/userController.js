import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import sendEmail  from "../utils/email.js";
import { generateOtp } from "../utils/generateOtp.js";



//
export  async function getUsers(req,res){
  try {
    let existingUsers = await User.find();
    if(!existingUsers){
    return res.status(404).json({
        code:201,
        message:'there is no users'
     })
    }
    res.render('home', {users:existingUsers, title:'home'})
   
  } catch (error) {
    res.status(500).json({
        code:500,
        message:error.message
    })
  }
}





export  async function register(req,res){
  try {
    let existingUser = await User.findOne({email:req.body.email});
    if(existingUser){
    return res.status(201).json({
        code:201,
        message:'user already registered, please try again'
     })
    }
     let newUser = await User.create(req.body)
     res.render('home', {tasks:newUser, title:'home'})
      // console.log(newUser);
    //  res.status(201).json({
    //     code:201,
    //     data:{
    //         newUser
    //     }
    //  })
  } catch (error) {
    res.status(500).json({
        code:500,
        message:error.message
    })
  }
}

//login

export  async function login(req,res){
    try {
      let existingUser = await User.findOne({email:req.body.email});
      let isMatch= await existingUser?.verifyPassword(req.body.password, existingUser.password)

      if(!existingUser){
      return res.status(201).json({
          code:201,
          message:'user is not registered, please register before login'
       })
      }
      if(!isMatch){
        return res.status(201).json({
            code:201,
            message:'user password is does not match'
         })
        }
  
      console.log(isMatch);

    let token= jwt.sign({id:existingUser._id},'Secret',{
        expiresIn:24*60*60
    })

    // res.redirect('/api/v1/profile/home')
       res.status(200).json({
          code:201,
          message:"Logged In",
          data:{
              existingUser,
              token
          }
       })
    } catch (error) {
      res.status(500).json({
          code:500,
          message:error.message
      })
    }
  }

  //forgot password
  export  async function forgotPassword(req,res){
    try {
      let existingUser = await User.findOne({email:req.body.email});

      if(!existingUser){
      return res.status(201).json({
          code:201,
          message:'user is not registered, please register '
       })
      }
      
      let token= jwt.sign({id:existingUser._id},'Secret',{
        expiresIn:24*60*60
    })
      let resetToken= await existingUser?.createResetPasswordToken(token);
       await existingUser.save({validateBeforeSave:false})
    
      console.log(resetToken);


      
   let otp= await generateOtp();
   console.log(otp);
   ///sending mail
   let resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
   let message =`we have recived a password reset request pls reste your password \n\n ${resetUrl}   \n\n\n Your OTP is : ${otp} `

  
   try {
     await sendEmail({
         email: existingUser.email,
         subject:`password cahnge request recived`,
         message:message 
         
      })
 
      res.status(200).json({
         code:200,
         message:'password sent to user mail'
      })
     
   } catch (error) {
     console.log(error);
     existingUser.passwordResetToken =undefined
     existingUser.passwordResetTokenExpires= undefined
     existingUser.save({validateBeforeSave:false})
     return res.status(500).json({
         code:500,
         message:'server issue '
     })
   }

 
      //  res.status(200).json({
      //     code:201,
      //     data:{
      //         existingUser,
      //         token
      //     }
      //  })
    } catch (error) {
      res.status(500).json({
          code:500,
          message:error.message
      })
    }
  }


  //rsest the passsowrd
  export  async function resetPassword(req,res){
    try {
      let existingUser = await User.findOne({passwordResetToken: req.params.token, 
        passwordResetTokenExpires :{$gt:(Date.now())}     });
      if(!existingUser){
      return res.status(404).json({
          code:404,
          message:'token is expired'
       })
      }
   

      existingUser.password = req.body.password;
      existingUser.confirmPassword= req.body.confirmPassword;
      existingUser.passwordResetToken=undefined;
      existingUser.passwordResetTokenExpires=undefined;
      existingUser.save()

       res.status(201).json({
          code:201,
         data:{
          existingUser
         }
       })
    } catch (error) {
      res.status(500).json({
          code:500,
          message:error.message
      })
    }
  }
  