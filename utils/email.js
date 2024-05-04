import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'donnie.windler@ethereal.email',
//         pass: 'nVYscKQqxwxZPz9ZwW'
//     }
// });

// await transporter.sendMail({
//     from : "jared.leuschke88@ethereal.email",
//     to: "arunb408@gmail.com",
//     subject :"WOw You an offer hereeee",
//     html:"<h1>Welcom to eat club order now</h1>",
//     text:"Today with beautiful offer"
// })


let sendEmail = async (option)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'donnie.windler@ethereal.email',
            pass: 'nVYscKQqxwxZPz9ZwW'
        }
    });
    
    await transporter.sendMail({
        from : "jared.leuschke88@ethereal.email",
        to: option.email,
        subject :option.subject,
        html:"<h1>Welcom to eat club order now</h1>",
        text:option.message
    })
    }
    
    export default sendEmail;