//import all user methods
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { updateProfile } = require("./updateProfile");
const { deleteAccount } = require("./deleteAccount");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword_get } = require("./resetPassword_get");
const { resetPassword_post } = require("./resetPassword_post");

//combine methods in userController obj
const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount,
  forgotPassword,
  resetPassword_get,
  resetPassword_post,
};

//to use in userRoute
module.exports = userController;
