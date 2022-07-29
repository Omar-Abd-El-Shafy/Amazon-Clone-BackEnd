//route associated with "/department" in server
const express = require("express");
const departmentRoute = express.Router();
//controller
const departmentController = require("../controllers/departmentController");
//midllewares
const {
  departmentValidator,
} = require("../MiddleWare/validators/departmentValidator");
const isAdmin = require("../MiddleWare/adminAuth");

// add department
departmentRoute.post(
  ["/", "/:name"],
  isAdmin,
  departmentValidator.nameValidator,
  departmentController.addDepartment
);

// delete department
departmentRoute.delete(
  ["/", "/:id"],
  isAdmin,
  departmentValidator.idValidator,
  departmentController.deleteDepartment
);

// update department
departmentRoute.put(
  ["/", "/:id/:name"],
  isAdmin,
  departmentValidator.updateValidator,
  departmentController.updateDepartment
);

// get all depts
departmentRoute.get("/", departmentController.getAllDepartments);

// get dept by id
departmentRoute.get(
  ["/onedept", "/onedept/:id"],
  departmentValidator.idValidator,
  departmentController.getDepartmentById
);

module.exports = departmentRoute;
