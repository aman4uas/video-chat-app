const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const constants = require("../config/constants");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: constants.OTP_TIME_EXPIRY*60,
    }
});


/* Function to send emails */

async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(
          email,
          "OTP Verification Email",
          otp
        );
    }
    catch(error) {
        console.log("Error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
}) 

module.exports = mongoose.model("OTP", OTPSchema);

