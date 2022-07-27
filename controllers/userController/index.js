//import all user methods
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { deleteAccount } = require("./deleteAccount");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword_get } = require("./resetPassword_get");
const { resetPassword_post } = require("./resetPassword_post");
const { updateProfile } = require("./updateProfile");
const { updatePassword } = require("./updatePassword");

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
  updatePassword,
};

//to use in userRoute
module.exports = userController;
