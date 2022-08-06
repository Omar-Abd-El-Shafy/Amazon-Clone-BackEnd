const { makeOrder } = require("./makeOrder");
const { updateOrderStatus } = require("./updateOrderStatus");
const { cancelOrder } = require("./cancelOrder");

//combine methods in cartController in an obj
const orderController = {
  makeOrder,
  updateOrderStatus,
  cancelOrder,
};

//to use in productRoute
module.exports = orderController;
