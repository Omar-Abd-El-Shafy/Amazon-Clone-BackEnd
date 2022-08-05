//route associated with "/user" in server
const express = require("express");
const userRoute = express.Router();
//controller
const userController = require("../controllers/userController");
//midllewares
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
const {
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  loginValidator,
  updateUserValidator,
  pageValidator,
} = require("../MiddleWare/validators");

//http methods

// route for register
userRoute.post("/register", registerValidator, userController.register);

userRoute.post(
  "/forgotPassword",
  forgotPasswordValidator,
  userController.forgotPassword
);

// userRoute.post(
//   "/password-reset/:id/:token",
//   auth,
//   resetPasswordValidator,
//   userController.resetPassword
// );

userRoute.put("/", auth, resetPasswordValidator, userController.updatePassword);

// route for login
userRoute.post("/login", loginValidator, userController.login);

// route for get user data
userRoute.get("/", auth, userController.getUserProfile);

// route for get all users data [only for admin]
// page is passed in query params [?page=]
userRoute.get("/allUsers", isAdmin, pageValidator, userController.getAllUsers);

// route for delete user
userRoute.delete("/", auth, userController.deleteAccount);

// routes for update user profile
// to update name or email or phone
userRoute.put(["/"], auth, updateUserValidator, userController.updateProfile);

module.exports = userRoute;
