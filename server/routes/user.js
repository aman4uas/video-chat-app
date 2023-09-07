const express = require("express");
const router = express.Router();
const { validateSignupForm } = require("../Controllers/Helper");
const {login, signup } = require("../Controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/validate/signupform", validateSignupForm);


module.exports = router;