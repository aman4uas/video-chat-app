require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const dbConnection = require("./config/database");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use([cookieParser(), express.json()]);
app.use(cors({ origin: "*" }));
dbConnection.connect();

//Routes
app.get("/", (req, res) => res.sendFile("index.html"));
app.use("/api/user", userRoutes);
app.get("/test", (req, res) => {
  return res.json({
    data: "TESTING SUCCESS",
  });
});

app.listen(PORT, () =>
  console.log(`App is listening on port ${PORT}, URL: http://localhost:4000`)
);