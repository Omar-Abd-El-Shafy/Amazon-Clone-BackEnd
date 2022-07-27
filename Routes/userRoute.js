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

// route for register
userRoute.post(
  "/register",
  userValidator.registerValidator,
  userController.register
);
userRoute.post("/login", userValidator.loginValidator, userController.login);

userRoute.post(
  "/forgotPassword",
  userValidator.forgotPasswordValidator,
  userController.forgotPassword
);

userRoute.get(
  "/password-reset/:id/:token",
  auth,
  userController.resetPassword_get
);

userRoute.post(
  "/password-reset/:id/:token",
  auth,
  userValidator.resetPasswordValidator,

  userController.resetPassword_post
);

userRoute.get("/profile", auth, userController.getUserProfile);
userRoute.put(
  "/profile",
  auth,
  userValidator.updateValidator,
  userController.updateProfile
);

// route for login
userRoute.post("/login", userValidator.loginValidator, userController.login);

// route for get use data
userRoute.get("/profile", auth, userController.getUserProfile);

// route for delete user
userRoute.delete("/profile", auth, userController.deleteAccount);

// routes for update user profile
// to update name or email or phone
userRoute.put(
  ["/updateName", "/updateEmail", "/updatePhone"],
  auth,
  userValidator.updateValidator,
  userController.updateProfile
);
// to update password
userRoute.put(
  "/updatePassword",
  auth,
  userValidator.updateValidator,
  userController.updatePassword
);

//route test for authentication
userRoute.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = userRoute;
