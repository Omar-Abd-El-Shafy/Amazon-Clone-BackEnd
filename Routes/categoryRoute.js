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
  departmentIdValidator,
  updateCategoryValidator,
} = require("../MiddleWare/validators");

// add category [requires: category name, department _id]
categoryRoute.post(
  ["/", "/:name/:department_id"],
  isAdmin,
  addCategoryValidator,
  categoryController.addCategory
);

// delete category
categoryRoute.delete(
  ["/", "/:id"],
  isAdmin,
  idValidator,
  categoryController.deleteCategory
);

// get all Categories In Department by dept _id
categoryRoute.get(
  ["/", "/department_id"],
  departmentIdValidator,
  categoryController.getAllCategoriesInDepartment
);

// get category by id
categoryRoute.get(
  ["/oneCategory", "/oneCategory/:id"],
  idValidator,
  categoryController.getCategoryById
);

// update category
categoryRoute.put(
  ["/", "/:id/:name/:department_id"],
  isAdmin,
  updateCategoryValidator,
  categoryController.updateCategory
);

module.exports = categoryRoute;
