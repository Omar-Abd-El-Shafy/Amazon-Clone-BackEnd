const { oneOf } = require("express-validator");
// import userInputValidators
const {
  name,
  email,
  phone,
  password,
  confirmPassword,
  validationResults,
} = require("./userInputVaildators");

const registerValidator = [
  name,
  oneOf([email, phone]),
  password,
  confirmPassword,
  validationResults,
];

const loginValidator = [
  oneOf([email, phone]),
  password,
  validationResults,
]

const updateValidator = [
  oneOf([
    name,
    password,
    email,
    phone
  ]),
  validationResults
]

exports.userValidator = { registerValidator, loginValidator, updateValidator };
