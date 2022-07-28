//route associated with "/category" in server
const express = require("express");
const categoryRoute = express.Router();
//controller
const categoryController = require("../controllers/categoryController");
//midllewares
const {
  departmentValidator,
} = require("../MiddleWare/validators/departmentValidator");
const auth = require("../MiddleWare/auth");

// TO DO: admin auth
// add category
categoryRoute.post(
  ["/add", "/add/:name"],
  departmentValidator.addCategoryValidator,
  categoryController.addCategory
);

// TO DO: admin auth
// delete category
categoryRoute.delete(
  ["/delete", "/delete/:id"],
  departmentValidator.idValidator,
  categoryController.deleteCategory
);

// get all Categories In Department by dept id
categoryRoute.get(
  ["/", "/id"],
  departmentValidator.idValidator,
  categoryController.getAllCategoriesInDepartment
);

// get category by id
categoryRoute.get(
  ["/oneCategory", "/oneCategory/:id"],
  departmentValidator.idValidator,
  categoryController.getCategoryById
);

// TO DO: admin auth
// update category
categoryRoute.put(
  ["/update", "/update/:id/:name/:department_id/:department_name"],
  departmentValidator.updateCategoryValidator,
  categoryController.updateCategory
);

module.exports = categoryRoute;
