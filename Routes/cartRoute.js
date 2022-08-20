//route associated with "/product" in server
const express = require("express");
const cartRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller
const cartController = require("../controllers/cartController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The cart _id
 *         user:
 *           type: string
 *           description: _id ref of user
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: product _id
 *               quantity:
 *                 type: integer
 *                 description: quantity of product
 *         bill:
 *           type: integer
 *           description: total cart bill
 *       required:
 *         - id
 *         - product_id
 *         - quantity
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: return cart data only by sending token
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The cart data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       '404' :
 *         description: cart has no products
 */
cartRoute.get("/", auth, cartController.getCart);

/**
 * @swagger
 * /cart/addItem:
 *   put:
 *     summary: add an item with given quantity
 *     tags:
 *       - Cart
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
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       '202' :
 *         description: item added
 *       '404' :
 *         description: invalid token
 */
cartRoute.put("/addItem", auth, cartController.addItem);

/**
 * @swagger
 * /cart/removeItem:
 *   put:
 *     summary: remove a product from cart
 *     tags:
 *       - Cart
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
 *               product_id:
 *                 type: string
 *     responses:
 *       '200' :
 *         description: product removed
 *       '404' :
 *         description: invalid token
 */
cartRoute.put("/removeItem", auth, cartController.removeItem);

/**
 * @swagger
 * /cart/emptyCart:
 *   put:
 *     summary: empty cart from products and make bill = 0
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: cart is empty
 *       '404' :
 *         description: invalid token
 */
 cartRoute.put("/emptyCart", auth, cartController.emptyCart);

/**
 * @swagger
 * /cart/incItem:
 *   put:
 *     summary: increase item by 1 only on each request, if product was never there it will add it and make its quantity =1
 *     tags:
 *       - Cart
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
 *               product_id:
 *                 type: string
 *     responses:
 *       '202' :
 *         description: item added
 *       '404' :
 *         description: invalid token
 */
cartRoute.put("/incItem", auth, cartController.incItemByOne);

//http methods

module.exports = cartRoute;
