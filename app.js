const cors = require("cors");
require("dotenv").config();
require("./DataSource/database").connect();
const error = require("./MiddleWare/error");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./routes/productsRoute");
// const upload = require("./MiddleWare/S3uploadImages");
//server
const express = require("express");
const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || 3333;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.post("/upload", upload.array("img"), (req, res) => {
//   let locations = req.files.map((file) => {
//     return file.location;
//   });
//   console.log(locations);
//   return res.json({ status: "OK", uploaded: req.files.length });
// });

app.use(express.static("public"));
app.use("/product", productRoute);
app.use("/user", userRoute);
//error handler [MUST be the last middleware]
// app.use("/", (req, res) => {
//   res.send(
//     "<h1>Hello Amazing Team , Super Abdallah , heroine Enas, amazing Radwa , king Diaa</h1>"
//   );
// });

app.use("/", error);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//...................
module.exports = app;
