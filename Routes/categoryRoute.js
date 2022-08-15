//route associated with "/category" in server
const express = require("express");
const categoryRoute = express.Router();
//controller
const categoryController = require("../controllers/categoryController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const upload = require("../MiddleWare/S3uploadImages");
const {
  addCategoryValidator,
  idValidator,
  updateCategoryValidator,
} = require("../MiddleWare/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The category _id
 *         name:
 *           type: string
 *         department:
 *           type: string
 *           description: _id of department
 *       required:
 *         - id
 *         - name
 *         - department
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Adds new category
 *     tags:
 *       - Category
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
 *               department:
 *                 type: string
 *                 description: _id of department
 *             required:
 *               - name
 *               - department
 *           example:
 *             name: category name
  *             department: 62eec448f79362e81627dfe1
 *     responses:
 *       '201' :
 *         description: Created
 *       '404' :
 *         description: Department not found
 */
categoryRoute.post(
  "/",
  isAdmin,
  addCategoryValidator,
  categoryController.addCategory
);

/**
 * @swagger
 * /category/img/{id}:
 *   post:
 *     summary: Adds image to category
 *     tags:
 *       - Category
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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: The category image
 *             required:
 *               - img 
 *             encoding: 
 *               img: 
 *                 contentType: image/png, image/jpeg, image/jpg
 *     responses:
 *       '200' :
 *         description: Image added
 *       '404' :
 *         description: Category not found
 */
 categoryRoute.post(
  "/img/:id",
  isAdmin,
  upload.single("img"),
  categoryController.addImg
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Deletes a category by id
 *     tags:
 *       - Category
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
 *         description: Category not found
 */
categoryRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  categoryController.deleteCategory
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns a list of all categories
 *     tags:
 *       - Category
 *     responses:
 *       '200' :
 *         description: The category list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
 categoryRoute.get(
  "/",
  categoryController.getAllCategories
);

/**
 * @swagger
 * /category/dept/{id}:
 *   get:
 *     summary: Returns a list of all categories in one department
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The department _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The category list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
categoryRoute.get(
  "/dept/:id",
  idValidator,
  categoryController.getAllCategoriesInDepartment
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Returns one category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The category _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The category with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404' :
 *         description: Category not found
 */
categoryRoute.get("/:id", idValidator, categoryController.getCategoryById);

/**
 * @swagger
 * /category:
 *   put:
 *     summary: Updates a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires the category _id, name and department _id
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Category'
 *           example:
 *             id: 62eec448f79362e81627dfe1
 *             name: new name for category
 *             department: 62eec448f79362e81627dfef
 *     responses:
 *       '200' :
 *         description: updated
 *       '404' :
 *         description: Department or Category not found
 */
categoryRoute.put(
  "/",
  isAdmin,
  updateCategoryValidator,
  categoryController.updateCategory
);

module.exports = categoryRoute;
