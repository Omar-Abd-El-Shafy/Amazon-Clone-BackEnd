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

const stripe = require("stripe");
const express = require("express");
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_C1iyXwYMLycLTrCnBFaXhBAOM470Zylo";

exports.paymentCheck = (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("hello");
  // Handle the event
  let paymentIntent = null;
  switch (event.type) {
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      console.log(paymentIntent);

      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      console.log("success");
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.sendStatus(200);
};
