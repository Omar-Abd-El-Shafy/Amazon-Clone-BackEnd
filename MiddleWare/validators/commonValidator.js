const { check } = require("express-validator");
const validationResults = require("./validationResults");

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

  
// validators used in Route

// IMPORTANT
// all validators must have validationResults as last item in the array
const nameValidator = [name, validationResults];

//combine all validators in one obj
exports.commonValidator = {
  nameValidator,
};
