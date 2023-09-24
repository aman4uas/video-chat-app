require("dotenv").config();
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const constants = require("../config/constants");
const jwt = require("jsonwebtoken");

exports.resetPasswordToken = async (req, res) => {
  const email = req.body.email;

  try {
    // Email validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Cannot find Email...",
      });
    }

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Not a valid Email",
      });
    }

    //Check if email is registered or not
    const currentUser = await User.findOne({ email: email });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Email not registered.",
      });
    }

    //Generate Token
    const payload = {
      email: email,
    };
    let secret = process.env.JWT_SECRET + currentUser.password;
    let token = jwt.sign(payload, secret, {
      expiresIn: constants.PASSWORD_RESET_TIME_LIMIT,
    });

    //Create URL
    const URL = process.env.FRONTEND_URL + "/" + currentUser._id + "/" + token;

    //Send Mail containing URL
    const subject = "RESET PASSWORD LINK";
    const HTML_CONTENT = `Link for password reset: ${URL}`;
    await mailSender(email, subject, HTML_CONTENT);
    return res.status(200).json({
      success: true,
      message: "Reset Password link sent to mail successfully !!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error, Please try again !!",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword, token, id } = req.body;

  //Validation
  if (!password || !confirmPassword || !token || !id) {
    let message = "All fields are required";
    if (!token) message = "Cannot find token";
    if (!id) message = "Cannot find user ID";
    return res.status(400).json({
      success: false,
      message: message,
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  //Get user details from DB
  let currentUser;
  try {
    currentUser = await User.findById(id);
  } catch (err) {
    console.log("Error in Finding User inside RESET PASSWORD: ", err);
    return res.status(400).json({
      success: false,
      message: "Oops... Internal Server Error !!",
    });
  }
  if (!currentUser) {
    return res.status(400).json({
      success: false,
      message: "Cannot find user !!",
    });
  }

  //Verify Token and check for time
  let payload;
  try {
    let secret = process.env.JWT_SECRET + currentUser.password;
    payload = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token Expired",
    });
  }

  try {
    // Hash password
    let hashedPassword = await bcrypt.hash(password, 10);
    const update = { password: hashedPassword };
    const condition = { email: currentUser.email };
    await User.findOneAndUpdate(condition, update);

    return res.status(200).json({
      success: true,
      message: "Password updated Successfully !!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error updating Password !!",
      error: err,
    });
  }
};
