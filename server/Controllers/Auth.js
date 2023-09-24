require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const constants =  require("../config/constants");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, dob, gender, otp } = req.body;

    /* SignUp Form has already been validated*/

    /* Check if user exists or not */
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already Exists",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in finding user",
      });
    }

    /* Now Validate OTP */
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    /* Hash password */
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    /* Create entry for User in Database */
    const imageURL = "https://api.dicebear.com/7.x/initials/svg?seed=" + name;
    const user = await User.create({
      name,
      email,
      gender,
      dob,
      password: hashedPassword,
      imageURL: imageURL,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Validation on input parameters */
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details !!",
      });
    }

    /* Check for registered user */
    let user = await User.findOne({ email });

    /* If not a registered user */
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    /* Verify password & generate a JWT token */
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: constants.LOGIN_TIME_LIMIT,
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + constants.LOGIN_TIME_LIMIT * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Logged in successfully",
      });
    } else {
      //passwsord do not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

const generateOTP = async function (email) {
  let newOtp, findOTPMatch;
  do {
    newOtp = otpGenerator.generate(constants.OTP_LENGTH, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    findOTPMatch = await OTP.findOne({ otp: newOtp });
  } while (findOTPMatch);

  await OTP.create({
    otp: newOtp,
    email: email,
  });
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;
  generateOTP(email)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "OTP Resent Sucessfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "Error in Resending OTP",
        error: err,
      });
    });
};

exports.validateSignupForm = async (req, res) => {
  const { name, email, gender, dob, confirmPassword, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in finding user",
    });
  }

  generateOTP(email)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Go for OTP Verification",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "Error in generating OTP",
        error: err,
      });
    });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "New Password and Confirm New Password do not match",
    });
  }

  try {
    const currentUser = await User.findOne({ email: req.user.email });
    if ((await bcrypt.compare(oldPassword, currentUser.password)) === false) {
      return res.status(400).json({
        success: false,
        message: "Old Password does not match",
      });
    }
    const condition = { email: req.user.email };

    /* Hash password */
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    const update = { password: hashedPassword };
    const result = await User.findOneAndUpdate(condition, update);
    if (result) {
      mailSender(
        req.user.email,
        "Password Changed",
        "Your password has been successfully updated."
      ).catch((err) =>
        console.log("Password change/update message cannot be sent!!")
      );
      return res.status(200).json({
        success: true,
        message: "Password changed successfully !!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Current Password does not match !!",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error in changing password",
    });
  }
};