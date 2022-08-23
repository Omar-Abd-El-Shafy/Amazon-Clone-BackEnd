const express = require("express");
const paymentRoute = express.Router();
const auth = require("../MiddleWare/auth");

//controller
const paymentController = require("../controllers/paymentController/index");
paymentRoute.get("/create-payment-intent", auth, paymentController.payment);
paymentRoute.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.paymentCheck
);
module.exports = paymentRoute;
