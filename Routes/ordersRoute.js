//route associated with "/order" in server
const express = require("express");
const orderRoute = express.Router();
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
//controller
const orderController = require("../controllers/orderController/index");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The order _id
 *         user:
 *           type: string
 *           description: The user _id
 *         deliveryAddress:
 *           type: object
 *           properties:
 *             building:
 *               type: string
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *             zipCode:
 *               type: string
 *             phone:
 *               type: string
 *         transaction_id:
 *           type: string
 *         deliveryDate:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["pendingPayment", "canceled", "delivered", "shipped"]
 *           default: pendingPayment
 *         paymentMethod:
 *           type: string
 *           enum: ["cod", "visa"]
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productBrief:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image_path:
 *                     type: string
 *               quantity:
 *                 type: number
 *                 default: 1
 *                 minimum: 1
 *         shippingFee:
 *           type: number
 *         bill:
 *           type: number
 *           default: 0
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Creates new order with cart products, updates the stock, calculates the bill and returns the created order
 *     tags:
 *       - Order
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
 *               deliveryAddress:
 *                 type: object
 *                 properties:
 *                   building:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   phone:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: ["cash", "visa"]
 *             required:
 *               - deliveryAddress
 *               - deliveryNotes
 *               - paymentMethod
 *           example:
 *             deliveryAddress:
 *               building: 100
 *               street: 9
 *               city: El-Mokkattam
 *               state: Cairo
 *               country: Egypt
 *               zipCode: 11571
 *               phone: 01012345678
 *             paymentMethod: visa
 *     responses:
 *       '201' :
 *         description: The Created Order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400' :
 *         description: A Product array with out-of-stock products
 *         content:
 *           application/json:
 *             schema:
 *               noStockProducts:
 *                 description: The out-of-stock products that should be removed from cart
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 */
orderRoute.post("/", auth, orderController.makeOrder);

/**
 * @swagger
 * /order:
 *   put:
 *     summary: Cancels an order by admin and updates the stock
 *     tags:
 *       - Order
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The admin token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Requires the order _id and status
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: _id of the order to be cancelled
 *               status:
 *                 type: string
 *             required:
 *               - order_id
 *               - status
 *           example:
 *             order_id: 62fec76c83d928fc3b4792cd
 *             status: canceled
 *     responses:
 *       '201' :
 *         description: The Updated Order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404' :
 *         description: order Doesn't exist
 */
orderRoute.put("/", isAdmin, orderController.cacnelOrder);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Returns one order
 *     tags:
 *       - Order
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: The order _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The order with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404' :
 *         description: Order not found
 */
orderRoute.get("/:id", auth, orderController.getOrderById);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Returns a list of all orders made by user
 *     tags:
 *       - Order
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The orders list
 *         content:
 *           application/json:
 *             schema:
 *               order:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 */
orderRoute.get("/", auth, orderController.getAllOrders);
orderRoute.get("/admin/:id", isAdmin, orderController.getOrderForAdmin);

module.exports = orderRoute;
