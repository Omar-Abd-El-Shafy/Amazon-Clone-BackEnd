const { body, check } = require("express-validator");
const validator = require("validator");

// this file contains the customized validators to use them in validators

// common validation methods:
// exists(): check the field is not undefiend
// notEmpty():  check if a value is not empty; that is, a string with a length of 1 or bigger.
// bail(): Stops running validations if any of the previous ones have failed.
// withMessage(): provides error message if the validation didn't pass

// validation chain

// ################################### user input #####################################

exports.userName = body("name")
  .exists()
  .notEmpty()
  .withMessage("Name is required")
  .bail() //to stop validation if the previous condition didn't pass
  .trim() // remove spaces from start & end
  .isLength({ min: 3 })
  .withMessage("Name min length is 3")
  .bail()
  //"en-US", "ar": to enable user enter name in arabic or english,
  // ignore: " ": ignore space in the middle to enter first and last name [optional]
  .custom(
    (val) =>
      validator.isAlpha(val, "en-US", { ignore: " " }) ||
      validator.isAlpha(val, "ar", { ignore: " " })
  );

exports.email = body("email")
  .exists()
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email address")
  .bail();

exports.phone = body("phone")
  .exists()
  .notEmpty()
  .withMessage("Phone is required")
  .bail()
  .isMobilePhone()
  .withMessage("Invalid phone number")
  .bail();

exports.password = body("password")
  .exists()
  .notEmpty()
  .withMessage("Password is required")
  .bail()
  // check password contains at least 1 lowercase letter,
  // 1 uppercase letter, 1 symbol, and min length is 8
  .isStrongPassword()
  .withMessage("Weak password")
  .bail();

exports.loginPassword = body("password")
  .exists()
  .notEmpty()
  .withMessage("Password is required")
  .bail();

exports.confirmPassword = body("confirm_password")
  .exists()
  .notEmpty()
  .withMessage("Confirm password password is required")
  .bail()
  // check confirm password matches password
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Passwords did not match")
  .bail();

// ################################### common input #####################################

// validation chain for id
// created as a function to allow for custmized id names
exports.id = (id = ["id"]) =>
  check(id)
    .exists()
    .withMessage("ID is required")
    .bail()
    .isMongoId()
    .withMessage("ID must be MongoDB ObjectId.")
    .bail();

// validation chain for depat & category name
exports.name = check("name")
  .exists()
  .notEmpty()
  .withMessage("Name is required")
  .bail() //to stop validation if the previous condition didn't pass
  .trim() // remove spaces from start & end
  .isLength({ min: 3 })
  .withMessage("Name min length is 3")
  .bail();

// validation chain for page number
exports.page = check("page")
  .optional()
  .isInt()
  .withMessage("Page must be integer")
  .bail()
  .custom((value) => value > 0)
  .withMessage("Page must be greater than 0")
  .bail();
