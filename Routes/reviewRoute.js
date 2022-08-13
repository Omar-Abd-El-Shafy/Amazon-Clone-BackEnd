//route associated with "/review" in server
const express = require("express");
const reviewRoute = express.Router();
//controller
const reviewController = require("../controllers/reviewController");
//midllewares
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
const {
  addReviewValidator,
  idValidator,
  getAllValidator,
} = require("../MiddleWare/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The review _id
 *         user:
 *           type: string
 *           description: The user _id, when populated returns the user object
 *         product:
 *           type: string
 *           description: The product _id, when populated returns the product object
 *         rating:
 *           type: number
 *           enum: [1, 2, 3, 4, 5]
 *           description: The user rating of the products, only accept values from 1 to 5
 *         title:
 *           type: string
 *           description: The review title
 *         comment:
 *           type: string
 *           description: The review body
 *         date:
 *           type: string
 *           default: Date.now
 *       required:
 *         - id   
 *         - user   
 *         - product   
 *         - rating   
 *         - title   
 *         - comment   
 */ 



/**
 * @swagger
 * /review:
 *   post:
 *     summary: Adds new review
 *     tags:
 *       - Review
 *     parameters:
 *       - in: header      
 *         name: x-access-token
 *         required: true   
 *         description: The user token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The product _id, when populated returns the product object
 *               rating:
 *                 type: number
 *                 enum: [1, 2, 3, 4, 5]
 *                 description: The user rating of the products, only accept values from 1 to 5
 *               title:
 *                 type: string
 *                 description: The review title
 *               comment:
 *                 type: string
 *                 description: The review body
 *             required:
 *               - product   
 *               - rating   
 *               - title   
 *               - comment    
 *           example:
 *             product: 62eec448f79362e81627dfe7
 *             rating: 3
 *             title: review title
 *             comment: bla bla bla
 *     responses:
 *       '201' :
 *         description: Created
 *       '404' :
 *         description: Product not found
 *       '409' :
 *         description: Already reviewed
 *       '403' :
 *         description: Product must be bought before review
 */
 reviewRoute.post("/", auth, addReviewValidator, reviewController.addReview);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Deletes a review by id, [valid to admin only]
 *     tags:
 *       - Review
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
 *         description: The review _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: Deleted
 *       '404' :
 *         description: Review not found
 */
 reviewRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  reviewController.deleteReview
);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Returns one review
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The review _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The review with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '404' :
 *         description: Review not found
 */
reviewRoute.get("/:id", idValidator, reviewController.getReviewById);

/**
 * @swagger
 * /review/product/{id}:
 *   get:
 *     summary: Returns all reviews on one product
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product _id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The number of page to display reviews
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           default: 8
 *         description: The number of items to display in page
 *     responses:
 *       '200' :
 *         description: The reviews on the given product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404' :
 *         description: Review not found
 */
 reviewRoute.get(
  "/product/:id",
  getAllValidator,
  reviewController.getReviewsOnProduct
);

/**
 * @swagger
 * /review/user/{id}:
 *   get:
 *     summary: Returns all reviews written by one user [valid to admin only]
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user _id
 *         schema:
 *           type: string
 *       - in: header      
 *         name: x-access-token
 *         required: true   
 *         description: The admin token
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The number of page to display reviews
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           default: 8
 *         description: The number of items to display in page
 *     responses:
 *       '200' :
 *         description: The reviews list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404' :
 *         description: User or Reviews not found
 */
 reviewRoute.get(
  "/user/:id",
  getAllValidator,
  isAdmin,
  reviewController.getReviewsByUser
);

module.exports = reviewRoute;
