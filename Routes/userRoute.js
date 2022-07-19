//route associated with "/user" in server
const express = require("express");
const userRoute = express.Router();
//controller
const userController = require("../controllers/userController");
//midllewares
const { userValidator } = require("../MiddleWare/validators/userValidator");
const auth = require("../MiddleWare/auth");

//http methods 
// we do check validaiton in request before  we register 
userRoute.post("/register", userValidator, userController.register);
userRoute.post("/login", userController.login);

//route test for authentication
userRoute.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = userRoute;
