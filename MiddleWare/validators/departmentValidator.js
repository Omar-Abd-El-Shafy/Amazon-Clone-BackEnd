const { check } = require("express-validator");
const validationResults = require("./validationResults");

// validator for department & category

// validation chain for depat & category name
const name = check("name")
  .exists()
  .notEmpty()
  .withMessage("Name is required")
  .bail() //to stop validation if the previous condition didn't pass
  .trim() // remove spaces from start & end
  .isLength({ min: 3 })
  .withMessage("Name min length is 3")
  .bail();

const department_name = check("department_name")
  .exists()
  .notEmpty()
  .withMessage("Name is required")
  .bail() //to stop validation if the previous condition didn't pass
  .trim() // remove spaces from start & end
  .isLength({ min: 3 })
  .withMessage("Name min length is 3")
  .bail();

// validation chain for depat id
const id = check("id")
  .exists()
  .withMessage("ID is required")
  .bail()
  .isInt()
  .withMessage("ID must be integer")
  .bail();

const department_id = check("department_id")
  .exists()
  .withMessage("ID is required")
  .bail()
  .isInt()
  .withMessage("ID must be integer")
  .bail();


// validators used in Route
// IMPORTANT
// all validators must have validationResults as last item in the array
// const addValidator = [name, validationResults];
const nameValidator = [name, validationResults];
const idValidator = [id, validationResults];
const updateValidator = [id, name, validationResults];

// category validators
const addCategoryValidator = [name, department_id, department_name, validationResults];
const updateCategoryValidator = [id, name, department_id, department_name, validationResults];


//combine all validators in one obj
exports.departmentValidator = {
  // addValidator,
  idValidator,
  nameValidator,
  updateValidator,
  addCategoryValidator,
  updateCategoryValidator
};
