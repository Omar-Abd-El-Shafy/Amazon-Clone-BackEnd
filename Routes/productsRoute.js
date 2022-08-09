//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
//controller
const productController = require("../controllers/productController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const upload = require("../MiddleWare/S3uploadImages");
const {
  idValidator,
  getAllValidator,
  pageValidator,
} = require("../MiddleWare/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The product _id
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: number
 *         description:
 *           type: string
 *         image_path:
 *           type: array
 *           items:
 *             type: string
 *           description: Array containing the pathes of images after being uploaded on aws
 *         department:
 *           type: string
 *           description: _id of department
 *         category:
 *           type: string
 *           description: _id of category
 *         rating:
 *           type: number
 *         cod:
 *           type: boolean
 *           description: cash on delivery
 *         brand:
 *           type: string
 *         weight:
 *           type: number
 *       required:
 *         - id
 *         - name
 *         - price
 *         - stock
 *         - description
 *         - department
 *         - category
 *         - brand
 *         - weight
 *         - image_path
 *   parameters:
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: The number of page to display products
 *     itemsPerPage:
 *       in: query
 *       name: itemsPerPage
 *       schema:
 *         type: integer
 *         default: 8
 *       description: The number of items to display in page
 *     department:
 *       in: query
 *       name: department
 *       schema:
 *         type: string
 *       description: The _id of department to filter products
 *     category:
 *       in: query
 *       name: category
 *       schema:
 *         type: string
 *       description: The _id of category to filter products
 *     brand:
 *       in: query
 *       name: brand
 *       schema:
 *         type: string
 *       description: The brand name to filter products
 *     rating:
 *       in: query
 *       name: rating
 *       schema:
 *         type: number
 *         minimum: 0
 *         maximum: 5
 *       description: The users rating of product to filter products
 *     minPrice:
 *       in: query
 *       name: minPrice
 *       schema:
 *         type: number
 *       description: The minimum price of product to filter products
 *     maxPrice:
 *       in: query
 *       name: maxPrice
 *       schema:
 *         type: number
 *       description: The maximum price of product to filter products
 *     includeOutOfStock:
 *       in: query
 *       name: includeOutOfStock
 *       schema:
 *         type: boolean
 *         default: false
 *       description: Boolean to include out of stock products in filter products
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Adds new product
 *     tags:
 *       - Product
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
 *             $ref: '#components/schemas/Product'
 *           example:
 *             name: product name
 *             price: 500
 *             stock: 1000
 *             description: awesome product
 *             department: 62eec448f79362e81627dfe1
 *             category: 62eec448f79362e81627dfe1
 *             brand: hp
 *             weight: 20
 *     responses:
 *       '201' :
 *         description: Created
 *       '409' :
 *         description: A Product already Exist with Same Name
 */
productRoute.post("/", upload.array("img"), productController.addProduct);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Updates a product
 *     tags:
 *       - Product
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires the product _id and fields to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             id: 62eec448f79362e81627dfe1
 *             name: new name for product
 *     responses:
 *       '200' :
 *         description: updated
 *       '404' :
 *         description: Product not found, Enter a valid id
 */
productRoute.put("/", isAdmin, productController.updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Deletes a product by id
 *     tags:
 *       - Product
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
 *         description: The product _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: Deleted
 *       '404' :
 *         description: Product not found
 */
productRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  productController.deleteProduct
);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Returns one product
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The product with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404' :
 *         description: Product not found
 */
productRoute.get("/:id", idValidator, productController.getProductById);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Returns a list of all products
 *     tags:
 *       - Product
 *     parameters:
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/itemsPerPage'
 *       - $ref: '#/components/parameters/department'
 *       - $ref: '#/components/parameters/category'
 *       - $ref: '#/components/parameters/brand'
 *       - $ref: '#/components/parameters/rating'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/includeOutOfStock'
 *     responses:
 *       '200' :
 *         description: The product list
 */
productRoute.get("/", pageValidator, productController.getAllProducts);

/**
 * @swagger
 * /product/search:
 *   get:
 *     summary: Returns a list of products that matches search conditions
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The product name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: |
 *           The sort by condition takes on of the values
 *           * Price: Low to High
 *           * Price: High to Low
 *           * Avg. Customer review
 *       - $ref: '#/components/parameters/page'
 *       - $ref: '#/components/parameters/itemsPerPage'
 *       - $ref: '#/components/parameters/department'
 *       - $ref: '#/components/parameters/category'
 *       - $ref: '#/components/parameters/brand'
 *       - $ref: '#/components/parameters/rating'
 *       - $ref: '#/components/parameters/minPrice'
 *       - $ref: '#/components/parameters/maxPrice'
 *       - $ref: '#/components/parameters/includeOutOfStock'
 *     responses:
 *       '200' :
 *         description: The product list
 *       '404' :
 *         description: Products not found
 */
productRoute.get("/search", productController.search);

// [TO DELETE]
// // get all products in one category by category _id
// productRoute.get(
//   "/category/:id",
//   getAllValidator,
//   productController.getAllProductsInCategory
// );
// [TO DELETE]
// // get all products in one department by department _id
// productRoute.get(
//   "/department/:id",
//   getAllValidator,
//   productController.getAllProductsInDepartment
// );

module.exports = productRoute;
