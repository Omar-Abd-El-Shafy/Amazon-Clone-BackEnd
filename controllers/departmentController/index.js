//import all department methods
const { addDepartment } = require("./addDepartment");
const { getAllDepartments } = require("./getAllDepartments");
const { deleteDepartment } = require("./deleteDepartment");
const { updateDepartment } = require("./updateDepartment");
const { getDepartmentById } = require("./getDepartmentById");

//combine methods in obj
// deparment CRUD operations
const departmentController = {
  addDepartment,
  getAllDepartments,
  deleteDepartment,
  updateDepartment,
  getDepartmentById
};

//to use in Route
module.exports = departmentController;
