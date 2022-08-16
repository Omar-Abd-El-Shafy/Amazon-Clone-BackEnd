const cors = require("cors");
require("dotenv").config();
//databaseConnection
require("./DataSource/database").connect();
// middlewares
const error = require("./MiddleWare/error");
const morgan = require("./MiddleWare/morgan");
const { apiDoc } = require("./MiddleWare/apiDoc");
// routes
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productsRoute");
// const upload = require("./MiddleWare/S3uploadImages");
const departmentRoute = require("./Routes/departmentRoute");
const categoryRoute = require("./Routes/categoryRoute");
const cartRoute = require("./Routes/cartRoute");
const reviewRoute = require("./Routes/reviewRoute");
const orderRoute = require("./Routes/ordersRoute");
const paymentRoute = require("./Routes/paymentRoute");
const addressRoute = require("./Routes/addressRoute");
//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || 3333;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);
app.use("/api-doc", apiDoc);

// routes
app.use((req, res, next) => {
  if (req.originalUrl === "/payment/webhook") {
    // console.log("original URL in ignoring wehook");
    // console.log(req.originalUrl);
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    // console.log("original URL in else");
    // console.log(req.originalUrl);
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use(express.static("public"));

app.use("/payment", paymentRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/department", departmentRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/review", reviewRoute);
app.use("/order", orderRoute);
app.use("/address", addressRoute);

app.use("/", (req, res) => {
  res.send(
    "<h1>Hello Amazing Team , Super Abdallah , heroine Enas, amazing Radwa , king Diaa</h1>"
  );
});
//error handler [MUST be the last middleware]
app.use("/", error);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//...................
module.exports = app;
