//import all user methods and combine them in userController obj to use in userRoute
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { updateProfile } = require("./updateProfile");
const { deleteAccount } = require("./deleteAccount");


const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount
};

module.exports = userController;
