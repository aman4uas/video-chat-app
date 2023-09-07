require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const dbConnection = require("./config/database");
const app = express();
const PORT = process.env.PORT || 4000;

/*  Not Important   */
const OTP = require("./models/OTP");
const { auth } = require("./middlewares/auth");
const helper = require('./Controllers/Helper');
/*  Not Important   */

app.use([cookieParser(), express.json()]);
dbConnection.connect();

app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`App is listening at ${PORT}`));