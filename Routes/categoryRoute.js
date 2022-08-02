//route associated with "/category" in server
const express = require("express");
const categoryRoute = express.Router();
//controller
const categoryController = require("../controllers/categoryController");
//midllewares
const {
  departmentValidator,
} = require("../MiddleWare/validators/departmentValidator");
const isAdmin = require("../MiddleWare/adminAuth");

// add category [requires: category name, department _id]
categoryRoute.post(
  ["/", "/:name/:department_id"],
  isAdmin,
  departmentValidator.addCategoryValidator,
  categoryController.addCategory
);

// delete category
categoryRoute.delete(
  ["/", "/:id"],
  isAdmin,
  departmentValidator.idValidator,
  categoryController.deleteCategory
);

// get all Categories In Department by dept _id
categoryRoute.get(
  ["/", "/id"],
  departmentValidator.departmentIdValidator,
  categoryController.getAllCategoriesInDepartment
);

// get category by id
categoryRoute.get(
  ["/oneCategory", "/oneCategory/:id"],
  departmentValidator.idValidator,
  categoryController.getCategoryById
);

// update category
categoryRoute.put(
  ["/", "/:id/:name/:department_id"],
  isAdmin,
  departmentValidator.updateCategoryValidator,
  categoryController.updateCategory
);

module.exports = categoryRoute;
