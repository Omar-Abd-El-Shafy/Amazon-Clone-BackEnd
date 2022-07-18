const { body, oneOf, validationResult } = require("express-validator");

exports.userValidator = [
  body("first_name")
    .exists()
    .notEmpty()
    .withMessage("First is required")
    .bail()
    .isAlpha()
    .withMessage("First name must contain letters only")
    .bail()
    .isLength({ min: 3 })
    .withMessage("First name min length is 3")
    .bail(),
  body("last_name")
    .exists()
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .isAlpha()
    .withMessage("Last name must contain letters only")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Last name min length is 3")
    .bail(),
  oneOf([
    body("email")
      .exists()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email address")
      .bail(),
    body("phone")
      .exists()
      .notEmpty()
      .withMessage("Phone is required")
      .bail()
      .isMobilePhone()
      .withMessage("Invalid phone number")
      .bail(),
  ]),
  body("password")
    .exists()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isStrongPassword()
    .withMessage("Weak password")
    .bail(),
  body("confirm_password")
    .exists()
    .notEmpty()
    .withMessage("Confirm password password is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords did not match")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
