//import all user methods
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { deleteAccount } = require("./deleteAccount");
const { forgotPassword } = require("./forgotPassword");
const { resetPassword } = require("./resetPassword");
const { updateProfile } = require("./updateProfile");
const { getAllUsers } = require("./getAllUsers");
const { updatePassword } = require("./updatePassword");

//combine methods in userController obj
const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updatePassword,
};

//to use in userRoute
module.exports = userController;
