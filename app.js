//env variables
require("dotenv").config();
//connect database
require("./DataSource/database").connect();
//import jwt and bycrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//modules
const User = require("./Model/user");
//authentication :
const auth = require("./middleware/auth");
//controllers
const { login } = require("./controllers/login");
const { register } = require("./controllers/register");


//server
const express = require("express");
const app = express();
app.use(express.json());
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//route test for authentication
// app.use(auth())
app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});
//...................


app.post("/register", register);
app.post("/login", login);



module.exports = app;
