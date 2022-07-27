const cors = require("cors");
require("dotenv").config();
require("./DataSource/database").connect();
const error = require("./MiddleWare/error");
const userRoute = require("./Routes/userRoute");
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

// routes
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
