const { body } = require("express-validator");
const validator = require("validator");

// this file contains the customized validators to use them in userValidator

// common validation methods:
// exists(): check the field is not undefiend
// notEmpty():  check if a value is not empty; that is, a string with a length of 1 or bigger.
// bail(): Stops running validations if any of the previous ones have failed.
// withMessage(): provides error message if the validation didn't pass

// validation chain
const name = [
  body("name")
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
    ),
  // oneOf([
  //   body("name")
  //     .isAlpha("en-US", { ignore: " " }) // check name contains letters only
  //     .withMessage("Name must contain letters only")
  //     .bail(),
  //   body("name")
  //     .isAlpha("ar", { ignore: " " })
  //     .withMessage("Name must contain letters only")
  //     .bail(),
  // ]),
];

const email = body("email")
  .exists()
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email address")
  .bail();

const phone = body("phone")
  .exists()
  .notEmpty()
  .withMessage("Phone is required")
  .bail()
  .isMobilePhone()
  .withMessage("Invalid phone number")
  .bail();

const password = body("password")
  .exists()
  .notEmpty()
  .withMessage("Password is required")
  .bail()
  // check password contains at least 1 lowercase letter,
  // 1 uppercase letter, 1 symbol, and min length is 8
  .isStrongPassword()
  .withMessage("Weak password")
  .bail();

const loginPassword = body("password")
  .exists()
  .notEmpty()
  .withMessage("Password is required")
  .bail();

const confirmPassword = body("confirm_password")
  .exists()
  .notEmpty()
  .withMessage("Confirm password password is required")
  .bail()
  // check confirm password matches password
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Passwords did not match")
  .bail();

//combine all validators in one obj
module.exports = {
  name,
  email,
  phone,
  password,
  confirmPassword,
  loginPassword
};
