require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const constants =  require("../config/constants");

exports.signup = async (req,res) => {
    try{
        const { name, email, password, dob, gender, otp } = req.body;

        /* SignUp Form has already been validated  and checked if user exists or not*/
        /* Now Validate OTP */

        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length == 0) {
            return res.status(400).json({
                success:false,
                message:'OTP Not Found',
            })
        } else if(otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        /* Hash password */
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        /* Create entry for User in Database */
        const user = await User.create({
            name, 
            email, 
            gender, 
            dob, 
            password:hashedPassword, 
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}



exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;

        /* Validation on input parameters */
        if(!email || !password) 
        {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details !!',
            });
        }

        /* Check for registered user */
        let user = await User.findOne({email});

        /* If not a registered user */
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
        };

        /* Verify password & generate a JWT token */
        if(await bcrypt.compare(password, user.password)) {
            let token =  jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: constants.LOGIN_TIME_LIMIT });            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date( Date.now() + constants.LOGIN_TIME_LIMIT*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}