//route associated with "/user" in server
const express = require("express");
const userRoute = express.Router();

//controller
const userController = require("../controllers/userController");
//midllewares
const { userValidator } = require("../MiddleWare/validators/userValidator");
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
const { commonValidator } = require("../MiddleWare/validators/commonValidator");

//http methods
// we do check validaiton in request before  we register

// route for register
userRoute.post(
  "/register",
  userValidator.registerValidator,
  userController.register
);

userRoute.post(
  "/forgotPassword",
  userValidator.forgotPasswordValidator,
  userController.forgotPassword
);

userRoute.post(
  "/password-reset/:id/:token",
  auth,
  userValidator.resetPasswordValidator,
  userController.resetPassword
);

// route for login
userRoute.post("/login", userValidator.loginValidator, userController.login);

// route for get user data
userRoute.get("/", auth, userController.getUserProfile);

// route for get all users data [only for admin]
// page is passed in query params [?page=]
userRoute.get("/allUsers", isAdmin, commonValidator.pageValidator, userController.getAllUsers);

// route for delete user
userRoute.delete("/", auth, userController.deleteAccount);

// routes for update user profile
// to update name or email or phone
userRoute.put(
  ["/"],
  auth,
  userValidator.updateValidator,
  userController.updateProfile
);

// To delete [implemented in reset password]
// // to update password
// userRoute.put(
//   "/updatePassword",
//   auth,
//   userValidator.updateValidator,
//   userController.updatePassword
// );

//route test for authentication
// userRoute.get("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome");
// });

module.exports = userRoute;
