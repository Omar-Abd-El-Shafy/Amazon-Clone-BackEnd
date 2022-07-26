//import all user methods  
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { deleteAccount } = require("./deleteAccount");
const { updateProfile } = require("./updateProfile");
const { updatePassword } = require("./updatePassword");

//combine methods in userController obj
const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount,
  updatePassword
};

//to use in userRoute
module.exports = userController;
