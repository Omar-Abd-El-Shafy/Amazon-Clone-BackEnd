//env variables
require("dotenv").config();
//connect database
require("./DataSource/database").connect();
//midllewares [will add logs]
const error = require("./MiddleWare/error");
//routes
const userRoute = require("./Routes/userRoute");

//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
//to parse post req
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.use("/user", userRoute);
//error handler [MUST be the last middleware]
app.use("/", error);

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//...................
module.exports = app;
