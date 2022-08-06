//route associated with "/product" in server
const express = require("express");
const cartRoute = express.Router();
const auth = require("../MiddleWare/auth");
//controller

const cartController = require("../controllers/cartController");

cartRoute.get("/getCart", auth, cartController.getCart);
cartRoute.put("/addItem", auth, cartController.addItem);
cartRoute.put("/removeItem", auth, cartController.removeItem);
cartRoute.put("/emptyCart", auth, cartController.emptyCart);

//http methods

module.exports = cartRoute;
