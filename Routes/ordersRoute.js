//route associated with "/order" in server
const express = require("express");
const orderRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller
const orderController = require("../controllers/orderController/index");

orderRoute.post("/makeOrder", auth, orderController.makeOrder);
orderRoute.put("/", auth, orderController.updateOrderStatus);
orderRoute.get("/", auth, orderController.getOrderById);

module.exports = orderRoute;
