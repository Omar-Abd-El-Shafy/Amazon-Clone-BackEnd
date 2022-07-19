//import all user methods  
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { updateProfile } = require("./updateProfile");
const { deleteAccount } = require("./deleteAccount");

//combine methods in userController obj
const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount
};

//to use in userRoute
module.exports = userController;
