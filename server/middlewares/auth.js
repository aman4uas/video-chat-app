require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    /* Extract JWT token */
    // console.log("cookie" , req.cookies.token);
    // console.log("body" , req.body.token);
    // console.log("header", req.header("Authorization"));

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    /* Verify the JWT Token */
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; //Here we add the key 'user' to the request which contains all the payload information
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: error.message,
    });
  }
};
