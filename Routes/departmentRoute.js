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

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The department _id
 *         name:
 *           type: string
 *       required:
 *         - id   
 *         - name   
 */ 


/**
 * @swagger
 * /department:
 *   post:
 *     summary: Adds new department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: header      
 *         name: x-access-token
 *         required: true   
 *         description: The admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name   
 *           example:
 *             name: department name
 *     responses:
 *       '201' :
 *         description: Created
 *       '409' :
 *         description: A Department already Exist with Same Name
 */
 departmentRoute.post(
  "/",
  isAdmin,
  nameValidator,
  departmentController.addDepartment
);

/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     summary: Deletes a department by id
 *     tags:
 *       - Department
 *     parameters:
 *       - in: header      
 *         name: x-access-token
 *         required: true   
 *         description: The admin token
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: Deleted
 *       '404' :
 *         description: department not found
 */
 departmentRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  departmentController.deleteDepartment
);

/**
 * @swagger
 * /department:
 *   put:
 *     summary: Updates a department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: header      
 *         name: x-access-token
 *         required: true   
 *         description: The admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires the department _id and name 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *           example:
 *             id: 62eec448f79362e81627dfe1
 *             name: new name for department
 *     responses:
 *       '200' :
 *         description: updated
 *       '404' :
 *         description: Department not found
 */
 departmentRoute.put(
  "/",
  isAdmin,
  updateDepartmentValidator,
  departmentController.updateDepartment
);

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Returns a list of all departments
 *     tags:
 *       - Department
 *     responses:
 *       '200' :
 *         description: The department list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 */
 departmentRoute.get("/", departmentController.getAllDepartments);

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: Returns one department
 *     tags:
 *       - Department
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The department _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The department with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       '404' :
 *         description: Department not found
 */
 departmentRoute.get(
  "/:id",
  idValidator,
  departmentController.getDepartmentById
);

module.exports = departmentRoute;
