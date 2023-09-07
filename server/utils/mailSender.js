require('dotenv').config();
const nodemailer = require("nodemailer");

const mailSender = async (email, title, htmlBody) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to:`${email}`,
                subject: `${title}`,
                html: `${htmlBody}`,
            })
            //console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;