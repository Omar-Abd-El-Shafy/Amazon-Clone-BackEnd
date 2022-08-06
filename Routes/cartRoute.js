//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller

const cartController = require("../controllers/cartController");

productRoute.get("/getCart", auth, cartController.getCart);
productRoute.put("/addItem", auth, cartController.addItem);
productRoute.put("/removeItem", auth, cartController.removeItem);
productRoute.put("/emptyCart", auth, cartController.emptyCart);

//http methods

module.exports = productRoute;
