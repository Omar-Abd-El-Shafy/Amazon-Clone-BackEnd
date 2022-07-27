//import all category methods
const { addCategory } = require("./addCategory");
const {
  getAllCategoriesInDepartment,
} = require("./getAllCategoriesInDepartment");
const { deleteCategory } = require("./deleteCategory");
const { updateCategory } = require("./updateCategory");
const { getCategoryById } = require("./getCategoryById");

//combine methods in obj
// category CRUD operations
const categoryController = {
  addCategory,
  getAllCategoriesInDepartment,
  deleteCategory,
  getCategoryById,
  updateCategory
};

//to use in Route
module.exports = categoryController;
