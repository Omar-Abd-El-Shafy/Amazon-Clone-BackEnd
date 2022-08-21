//route associated with "/address" in server
const express = require("express");
const addressRoute = express.Router();
//controller
const addressController = require("../controllers/addressController");
//midllewares
const auth = require("../MiddleWare/auth");
const { idValidator, addressValidator } = require("../MiddleWare/validators");

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The address _id
 *         user:
 *           type: string
 *           description: The user _id
 *         building:
 *           type: string
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         zipCode:
 *           type: string
 *         phone:
 *           type: string
 *         fullAddress:
 *           type: string
 *           description: Constructed from building, street, city, state, country and zipCode
 */

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Adds new delivery address
 *     tags:
 *       - Address
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
 *               building:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - building
 *               - street
 *               - city
 *               - state
 *               - country
 *               - zipCode
 *               - phone
 *           example:
 *             building: 100
 *             street: 9
 *             city: El-Mokkattam
 *             state: Cairo
 *             country: Egypt
 *             zipCode: 11571
 *             phone: 01012345678
 *     responses:
 *       '201' :
 *         description: Created
 *       '200' :
 *         description: Address already exists
 */
addressRoute.post("/", auth, addressValidator, addressController.addAddress);

/**
 * @swagger
 * /address:
 *   get:
 *     summary: Returns a list of all addresses of user
 *     tags:
 *       - Address
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         required: true
 *         description: The user token
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The addresses list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *       '404' :
 *         description: Address not found
 */
addressRoute.get("/", auth, addressController.getAllAddressesOfUser);

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     summary: Returns one address
 *     tags:
 *       - Address
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
 *         description: The address _id
 *         schema:
 *           type: string
 *     responses:
 *       '200' :
 *         description: The address with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       '404' :
 *         description: Address not found
 */
addressRoute.get("/:id", auth, idValidator, addressController.getAddressById);

module.exports = addressRoute;
