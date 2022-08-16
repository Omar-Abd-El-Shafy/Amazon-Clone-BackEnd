//route associated with "/order" in server
const express = require("express");
const orderRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller
const orderController = require("../controllers/orderController/index");

orderRoute.post("/", auth, orderController.makeOrder);
orderRoute.put("/", auth, orderController.cacnelOrder);
orderRoute.get("/:id", auth, orderController.getOrderById);
orderRoute.get("/", auth, orderController.getAllOrders);

module.exports = orderRoute;
