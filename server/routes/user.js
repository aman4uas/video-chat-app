const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  validateSignupForm,
  resendOTP,
  changePassword,
} = require("../Controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/validate/signupform", validateSignupForm);
router.post("/resendOTP", resendOTP);
router.post("/changePassword", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;