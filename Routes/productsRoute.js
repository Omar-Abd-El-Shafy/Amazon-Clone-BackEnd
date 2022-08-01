//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
const isAdmin = require("../MiddleWare/adminAuth");
//controller

const productController = require("../controllers/productController");

//midllewares
const upload = require("../MiddleWare/S3uploadImages");
productRoute.post(
  "/add",
  isAdmin,
  upload.array("img"),
  productController.addProduct
);
productRoute.delete("/delete", isAdmin, productController.deleteProduct);
productRoute.get("/getAllProducts", productController.getAllProducts);
productRoute.get("/getProductById", productController.getProductById);
productRoute.get(
  ["/getAllProductsInCategory", "/getAllProductsInCategory/:category_id"],
  productController.getAllProductsInCategory
);
productRoute.put("/updateProduct", isAdmin, productController.updateProduct);

//http methods

module.exports = productRoute;
