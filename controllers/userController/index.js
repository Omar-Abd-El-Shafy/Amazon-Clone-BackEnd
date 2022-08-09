//import all user methods
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { deleteAccount } = require("./deleteAccount");
const { forgotPassword } = require("./forgotPassword");
const { resetPasswordStart } = require("./resetPasswordStart");
const { resetPasswordSubmit } = require("./resetPasswordSubmit");

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
  resetPasswordStart,
  resetPasswordSubmit,
  getAllUsers,
  updatePassword,
};

//to use in userRoute
module.exports = userController;
