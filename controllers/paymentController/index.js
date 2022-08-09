const { paymentCheck } = require("./paymentCheck");
const { payment } = require("./payment");

//combine methods in cartController in an obj
const paymentController = {
  payment,
  paymentCheck,
};

//to use in productRoute
module.exports = paymentController;
