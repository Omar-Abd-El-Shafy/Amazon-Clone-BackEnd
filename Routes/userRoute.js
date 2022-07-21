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
userRoute.post("/register", userValidator.registerValidator, userController.register);
userRoute.post("/login", userValidator.loginValidator, userController.login);

userRoute.get("/profile", auth, userController.getUserProfile);
userRoute.put("/profile", auth, userValidator.updateValidator, userController.updateProfile);

//route test for authentication
userRoute.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = userRoute;
