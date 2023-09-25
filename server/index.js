require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const dbConnection = require("./config/database");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use([cookieParser(), express.json()]);
dbConnection.connect();

//Routes
app.get("/", (req, res) => res.sendFile("server.html"));
app.use("/api/user", userRoutes);
app.get("/test", (req, res) => {
  return res.json({
    data: "TESTING SUCCESS",
  });
});


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));