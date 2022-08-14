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

const stripe = require("stripe")(
  "sk_test_51LTllPFwhSEkFDCIq8x9nTSaTw616bbHe9Sg7KKIOO6HpWs4QshU2SdPqGWE3KL9vPw9fTbfOU4iDg9FeciXJIJo00yPwCTY5T"
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_9Vq69tH5I98gDU33sl6OoinYWmAOHWF2";

exports.paymentCheck = (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log("after erro msg");
  // Handle the event
  let paymentIntent = null;
  switch (event.type) {
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      console.log("-----pyament failed--------------");

      console.log(paymentIntent);

      // Then define and call a function to handle the event payment_intent.payment_failed
      break;

    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      console.log("-----pyament cancelledddd--------------");

      // Then define and call a function to handle the event payment_intent.canceled
      break;

    case "payment_intent.succeeded":
      // Context.hasService()

      paymentIntent = event.data.object;
      console.log("-----pyament success--------------");
      console.log(paymentIntent);

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
};
