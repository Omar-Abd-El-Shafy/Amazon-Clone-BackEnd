//route associated with "/category" in server
const express = require("express");
const categoryRoute = express.Router();
//controller
const categoryController = require("../controllers/categoryController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const {
  addCategoryValidator,
  idValidator,
  updateCategoryValidator,
} = require("../MiddleWare/validators");

// add category [requires: category name, department _id]
categoryRoute.post(
  "/",
  isAdmin,
  addCategoryValidator,
  categoryController.addCategory
);

// delete category
categoryRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  categoryController.deleteCategory
);

// get all Categories In Department by dept _id
categoryRoute.get(
  "/:id",
  idValidator,
  categoryController.getAllCategoriesInDepartment
);

// get category by id
categoryRoute.get(
  "/one/:id",
  idValidator,
  categoryController.getCategoryById
);

// update category
categoryRoute.put(
  "/",
  isAdmin,
  updateCategoryValidator,
  categoryController.updateCategory
);

module.exports = categoryRoute;
