import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = new Schema({
    name:{
        type: String,
        required: [true,'the name field is required'],
    },
    email:{
        type: String,
        required: [true,'the email field is required'],
    },
    password:{
        type: String,
        required: [true,'the password field is required'],
        minLength:[8,'the password must have min 6 charataets']
    },
    confirmPassword:{
        type: String,
        required: [true,'the confirm password field is required'],
        validate :{
            validator: function(value) {
                return this.password === value
            },
            message:'the password and confirm password does not'
        }
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpires: {
        type: Date
    },
},
{
    timestamps: true,
})

userSchema.pre('save', async function(next){
    let salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    this.confirmPassword=undefined
    next()
})

userSchema.methods.verifyPassword= async function (pwd, pwdDb){
    return await bcrypt.compare(pwd,pwdDb)
} 

//
userSchema.methods.createResetPasswordToken= async function(token){
    // console.log(token);
    this.passwordResetToken= await token;
    this.passwordResetTokenExpires= Date.now() + 60*60*1000;
  return token;
}

let User= model('User',userSchema)

export default User