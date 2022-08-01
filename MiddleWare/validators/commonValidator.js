const { check } = require("express-validator");
const validationResults = require("./validationResults");

// validation chain for page number
const page = check("page")
  .optional()
  .isInt()
  .withMessage("Page must be integer")
  .bail()
  .custom((value) => value > 0)
  .withMessage("Page must be greater than 0")
  .bail();

const pageValidator = [page, validationResults];

exports.commonValidator = {
  pageValidator,
};
