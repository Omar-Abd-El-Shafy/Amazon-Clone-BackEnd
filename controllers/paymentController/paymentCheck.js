// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js
// const { Context } = require("../../DataSource/context");
const Order = require("../../Model/orders");
const Cart = require("../../Model/cart");
const { updateStock } = require("../../DataSource/stockUpdateBasedOnORder");
const stripe = require("stripe")(
  "sk_test_51LTllPFwhSEkFDCIq8x9nTSaTw616bbHe9Sg7KKIOO6HpWs4QshU2SdPqGWE3KL9vPw9fTbfOU4iDg9FeciXJIJo00yPwCTY5T"
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_9Vq69tH5I98gDU33sl6OoinYWmAOHWF2";
let status = "requires_payment_method";

exports.paymentCheck = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  let paymentIntent = null;

  switch (event.type) {
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      console.log("-----pyament failed--------------");

      // Then define and call a function to handle the event payment_intent.payment_failed
      break;

    case "payment_intent.created":
      paymentIntent = event.data.object;
      status = paymentIntent.status;
      // console.log("in payment Created--------------");
      // console.log("  iddddddd inside paymentintent creation ");
      // console.log(paymentIntent.id);

      setTimeout(() => {
        // console.log("in set time out");
        // console.log("paymentIntetn.--------statussssssssssss in timout");
        // console.log(status);

        if (status == "requires_payment_method") {
          // console.log("paymentIntetn --- status --- inside if condition ");
          // console.log(status);
          // console.log(" iddddddd inside paymentintent creation in Timoutttt");
          // console.log(paymentIntent.id);
          stripe.paymentIntents
            .cancel(paymentIntent.id)
            .then((result) => {
              console.log("result from payment cancellation ");
            })
            .catch((err) => {
              console.log("err from payment cancellation", err);
            });
        }
      },  60000);

      // Then define and call a function to handle the event payment_intent.created
      break;

    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      console.log("-----pyament cancelledddd--------------");
      status = paymentIntent.status;
      // const order = Order.findOne({ transaction_id: paymentIntent.id });

      const orderCancel = await Order.findOne({
        transaction_id: paymentIntent.id,
      });
      if (orderCancel) {
        console.log(".......................order  status ---------------");
        console.log(orderCancel);
        if (orderCancel.status == "pendingPayment") {
          orderCancel.status = status;
          await orderCancel.save();
          await updateStock(paymentIntent.id, "canceled");
        }
      }
      // Then define and call a function to handle the event payment_intent.canceled
      break;

    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      console.log("-----pyament success--------------");
      status = paymentIntent.status;
      const orderSucc = await Order.findOne({
        transaction_id: paymentIntent.id,
      });
      if (orderSucc) {
        if (orderSucc.status == "pendingPayment") {
          orderSucc.status = "shipped";
          const cart = await Cart.findOne({ user: orderSucc.user });
          cart.products = [];
          cart.bill = 0;
          await cart.save();
          await orderSucc.save();
        }
      }

      // console.log("status in succession , ", status);
      // clearTimeout(timeOut);
      // console.log(status);
      // console.log("payment Intent  iddddddd inside SUCCESSS");
      // console.log(paymentIntent.id);

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
