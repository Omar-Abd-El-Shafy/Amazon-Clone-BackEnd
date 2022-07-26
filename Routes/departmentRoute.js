//route associated with "/department" in server
const express = require("express");
const departmentRoute = express.Router();
//controller
const departmentController = require("../controllers/departmentController");
//midllewares
const {
  departmentValidator,
} = require("../MiddleWare/validators/departmentValidator");
const auth = require("../MiddleWare/auth");

// TO DO: admin auth
// add department
departmentRoute.post(
  ["/add", "/add/:name"],
  departmentValidator.addValidator,
  departmentController.addDepartment
);

// TO DO: admin auth
// delete department
departmentRoute.delete(
  ["/delete", "/delete/:id"],
  departmentValidator.idValidator,
  departmentController.deleteDepartment
);

// TO DO: admin auth
// update department
departmentRoute.put(
  ["/update", "/update/:id/:name"],
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
