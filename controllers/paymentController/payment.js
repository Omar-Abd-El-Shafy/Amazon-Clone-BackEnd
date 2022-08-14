const Order = require("../../Model/orders");

const express = require("express");
// const { Context } = require("../../DataSource/context");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51LTllPFwhSEkFDCIq8x9nTSaTw616bbHe9Sg7KKIOO6HpWs4QshU2SdPqGWE3KL9vPw9fTbfOU4iDg9FeciXJIJo00yPwCTY5T"
);

app.use(express.static("public"));
app.use(express.json());

// const calculateOrderAmount = () => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

exports.payment = async (req, res) => {
  const { order_id } = req.body;
  console.log("ORDER ID --------- ,", order_id);
  const order = await Order.findById(order_id);
  console.log("order--==-=-=", order);
  const bill = order.bill;
  console.log("billlll----------");
  console.log(bill);

  // Create a PaymentIntent with the order amount and currency
  let paymentIntent = await stripe.paymentIntents.create({
    amount: bill,
    currency: "egp",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  order.transaction_id = paymentIntent.id;
  order.save();
  console.log("paymentIntent from ceate payment.............");
  // console.log(paymentIntent);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
