const { makeOrder } = require("./makeOrder");
const { updateOrderStatus } = require("./updateOrderStatus");
const { getOrderById } = require("./getOrderById");

//combine methods in cartController in an obj
const orderController = {
  makeOrder,
  updateOrderStatus,
  getOrderById,
};

//to use in productRoute
module.exports = orderController;
