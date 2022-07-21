const { body, validationResult } = require("express-validator");

// implement validators
const name = body("name")
  .exists()
  .notEmpty()
  .withMessage("Name is required")
  .bail()
  .trim()
  .isAlpha("en-US", {ignore: " "})
  .withMessage("Name must contain letters only")
  .bail()
  .isLength({ min: 3 })
  .withMessage("Name min length is 3")
  .bail();

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
  .isStrongPassword()
  .withMessage("Weak password")
  .bail();

const confirmPassword = body("confirm_password")
  .exists()
  .notEmpty()
  .withMessage("Confirm password password is required")
  .bail()
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Passwords did not match")
  .bail();

// result middleware
const validationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
};

//combine all validators in one obj
module.exports = {
  name,
  email,
  phone,
  password,
  confirmPassword,
  validationResults,
};
