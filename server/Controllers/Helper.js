const otpGenerator = require('otp-generator');
const constants = require('../config/constants');
const OTP = require("../models/OTP");
const User = require("../models/User");

const generateOTP = async function (email) {
    let newOtp, findOTPMatch;
    do {
        newOtp = otpGenerator.generate(constants.OTP_LENGTH, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        findOTPMatch = await OTP.findOne({otp: newOtp});
    } while (findOTPMatch);

    await OTP.create({
        otp: newOtp,
        email: email
    })
}

exports.validateSignupForm = async (req, res) => {

    const { name, email, gender, dob, confirmPassword, password } = req.body;
    
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already Exists',
            });
        }
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Error in finding user",
        })
    }

    generateOTP(email)
        .then(()=>{
            return res.status(200).json({
                success: true,
                message: 'Go for OTP Verification',
            })
        })
        .catch((err)=>{
            return res.status(400).json({
                success: false,
                message: "Error in generating OTP",
                error: err,
            })
        })
}

