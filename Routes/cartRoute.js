//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller

const cartController = require("../controllers/cartController");

productRoute.get("/getCart", auth, cartController.getCart);
productRoute.put("/getProductById", auth, cartController.addItem);
productRoute.put("/updateProduct", auth, cartController.removeItem);

//http methods

module.exports = productRoute;
