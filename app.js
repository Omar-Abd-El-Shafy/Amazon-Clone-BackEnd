const cors = require("cors");
require("dotenv").config();
require("./DataSource/database").connect();
const error = require("./MiddleWare/error");
const userRoute = require("./Routes/userRoute");

//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("/user", userRoute);
//error handler [MUST be the last middleware]
app.use("/", (req, res) => {
  res.send("<h1>Hello s7s</h1>");
});
app.use("/", error);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//...................
module.exports = app;
