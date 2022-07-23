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
  "/add",
  commonValidator.nameValidator,
  departmentController.addDepartment
);

module.exports = departmentRoute;
