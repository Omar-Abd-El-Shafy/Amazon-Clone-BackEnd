const cors = require("cors");
require("dotenv").config();
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
//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.static("public"));
app.use(morgan);
app.use("/api-doc", apiDoc);

// routes
app.use((req, res, next) => {
  if (req.originalUrl === "/payment") {
    console.log(req.originalUrl);
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use("/payment", paymentRoute);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/department", departmentRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/review", reviewRoute);
app.use("/order", orderRoute);

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
