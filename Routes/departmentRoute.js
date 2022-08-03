//route associated with "/department" in server
const express = require("express");
const departmentRoute = express.Router();
//controller
const departmentController = require("../controllers/departmentController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const {
  idValidator,
  nameValidator,
  updateDepartmentValidator,
} = require("../MiddleWare/validators");

// add department
departmentRoute.post(
  ["/", "/:name"],
  isAdmin,
  nameValidator,
  departmentController.addDepartment
);

// delete department
departmentRoute.delete(
  ["/", "/:id"],
  isAdmin,
  idValidator,
  departmentController.deleteDepartment
);

// update department
departmentRoute.put(
  ["/", "/:id/:name"],
  isAdmin,
  updateDepartmentValidator,
  departmentController.updateDepartment
);

// get all depts
departmentRoute.get("/", departmentController.getAllDepartments);

// get dept by id
departmentRoute.get(
  ["/onedept", "/onedept/:id"],
  idValidator,
  departmentController.getDepartmentById
);

module.exports = departmentRoute;
