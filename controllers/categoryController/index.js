//import all category methods
const { addCategory } = require("./addCategory");
const {
  getAllCategoriesInDepartment,
} = require("./getAllCategoriesInDepartment");
const { deleteCategory } = require("./deleteCategory");
const { updateCategory } = require("./updateCategory");
const { getCategoryById } = require("./getCategoryById");
const { getAllCategories } = require("./getAllCategories");

//combine methods in obj
// category CRUD operations
const categoryController = {
  addCategory,
  getAllCategoriesInDepartment,
  deleteCategory,
  getCategoryById,
  updateCategory,
  getAllCategories
};

//to use in Route
module.exports = categoryController;
