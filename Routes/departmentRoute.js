//route associated with "/department" in server
const express = require("express");
const departmentRoute = express.Router();
//controller
const departmentController = require("../controllers/departmentController");
//midllewares
const { commonValidator } = require("../MiddleWare/validators/commonValidator");
const auth = require("../MiddleWare/auth");

// TO DO: admin auth
// add department
departmentRoute.post(
  ["/add", "/add/:name"],
  commonValidator.nameValidator,
  departmentController.addDepartment
);

// TO DO: admin auth
// delete department
departmentRoute.delete(
  ["/delete", "/delete/:id"],
  commonValidator.idValidator,
  departmentController.deleteDepartment
);

// TO DO: admin auth
// update department
departmentRoute.put(
  ["/update", "/update/:id/:name"],
  commonValidator.nameAndIdValidator,
  departmentController.updateDepartment
);

// get all depts
departmentRoute.get("/", departmentController.getAllDepartments);

module.exports = departmentRoute;
