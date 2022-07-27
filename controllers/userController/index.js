//import all user methods
const { login } = require("./login");
const { register } = require("./register");
const { getUserProfile } = require("./getUserProfile");
const { deleteAccount } = require("./deleteAccount");
<<<<<<< HEAD
const { forgotPassword } = require("./forgotPassword");
const { resetPassword_get } = require("./resetPassword_get");
const { resetPassword_post } = require("./resetPassword_post");
=======
const { updateProfile } = require("./updateProfile");
const { updatePassword } = require("./updatePassword");
>>>>>>> d014429cb2ceee484a58330cb863e6d4c98eb3be

//combine methods in userController obj
const userController = {
  login,
  register,
  getUserProfile,
  updateProfile,
  deleteAccount,
<<<<<<< HEAD
  forgotPassword,
  resetPassword_get,
  resetPassword_post,
=======
  updatePassword
>>>>>>> d014429cb2ceee484a58330cb863e6d4c98eb3be
};

//to use in userRoute
module.exports = userController;
