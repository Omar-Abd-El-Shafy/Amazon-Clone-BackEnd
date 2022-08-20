const {
  userName,
  email,
  phone,
  password,
  confirmPassword,
  loginPassword,
  name,
  id,
  page,
  rating,
  title,
  comment,
  requiredField,
  zipCode,
} = require("./inputs");
const validationResults = require("./validationResults");
const { oneOf } = require("express-validator");

// this is the validators used in Routes

// IMPORTANT
// all validators must have validationResults as last item in the array

// ################################### user validators #####################################

exports.registerValidator = [
  userName,
  email,
  phone,
  password,
  confirmPassword,
  validationResults,
];

exports.loginValidator = [
  oneOf([email, phone]),
  loginPassword,
  validationResults,
];

// in amazon, user can update only one field at a time, so we validate using oneOf
// oneOf Creates a middleware instance that will ensure at least one of the given chains
// passes the validation
exports.updateUserValidator = [
  oneOf([userName, email, phone]),
  validationResults,
];

exports.forgotPasswordValidator = [email, validationResults];

exports.resetPasswordValidator = [password, confirmPassword, validationResults];

// ################################### department validators #####################################

exports.nameValidator = [name, validationResults];

exports.updateDepartmentValidator = [id(), name, validationResults];

// ################################### category validators #####################################

exports.addCategoryValidator = [name, id(["department"]), validationResults];

exports.updateCategoryValidator = [
  id(["id", "department"]),
  name,
  validationResults,
];

exports.departmentIdValidator = [id(["department_id"]), validationResults];

// ################################### review validators #####################################

exports.addReviewValidator = [
  id(["product"]),
  rating,
  title,
  comment,
  validationResults,
];

exports.getAllValidator = [id(), page, validationResults];

// ################################### address validators #####################################

exports.addressValidator = [
  requiredField("building"),
  requiredField("street"),
  requiredField("city"),
  requiredField("state"),
  requiredField("country"),
  zipCode,
  phone,
  validationResults
]

// ################################### common validators #####################################

exports.idValidator = [id(), validationResults];

exports.pageValidator = [page, validationResults];
