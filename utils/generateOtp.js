import otp from 'otp-generator';

export async function generateOtp(){
    

  let Otp = otp.generate(6, { upperCaseAlphabets: false, specialChars: false });
    return Otp;

}