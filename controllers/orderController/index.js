const { makeOrder } = require("./makeOrder");
const { cacnelOrder } = require("./cancelOrder");
const { getOrderById } = require("./getOrderById");
const { getAllOrders } = require("./getAllOrders");
//combine methods in cartController in an obj
const orderController = {
  makeOrder,
  cacnelOrder,
  getOrderById,
  getAllOrders,
};

//to use in productRoute
module.exports = orderController;
