//route associated with "/product" in server
const express = require("express");
const orderRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller
const orderController = require("../controllers/orderController/index");

orderRoute.post("/makeOrder", auth, orderController.makeOrder);

module.exports = orderRoute;
