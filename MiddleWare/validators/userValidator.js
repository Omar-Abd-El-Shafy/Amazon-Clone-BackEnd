const { oneOf } = require("express-validator");
// import userInputValidators
const {
  name,
  email,
  phone,
  password,
  confirmPassword,
} = require("./userInputVaildators");
const validationResults = require("./validationResults");

// this is the validator used in userRoute

// IMPORTANT
// all validators must have validationResults as last item in the array

const registerValidator = [
  name,
  oneOf([email, phone]),
  password,
  confirmPassword,
  validationResults,
];

const loginValidator = [oneOf([email, phone]), password, validationResults];

// in amazon, user can update only one field at a time, so we validate using oneOf
// oneOf Creates a middleware instance that will ensure at least one of the given chains
// passes the validation
const updateValidator = [
  oneOf([name, password, email, phone]),
  validationResults,
];

const forgotPasswordValidator = [email, validationResults];

const resetPasswordValidator = [password, validationResults];

exports.userValidator = {
  registerValidator,
  loginValidator,
  updateValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
