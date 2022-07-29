const cors = require("cors");
require("dotenv").config();
require("./DataSource/database").connect();
const error = require("./MiddleWare/error");
const userRoute = require("./Routes/userRoute");

const productRoute = require("./Routes/productsRoute");
// const upload = require("./MiddleWare/S3uploadImages");
const departmentRoute = require("./Routes/departmentRoute");
const categoryRoute = require("./Routes/categoryRoute");

//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || 3333;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

//error handler [MUST be the last middleware]
// routes

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/department", departmentRoute);
app.use("/category", categoryRoute);

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
