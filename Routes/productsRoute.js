//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
//controller
const productController = require("../controllers/productController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const upload = require("../MiddleWare/S3uploadImages");

const {
  idValidator,
  getAllValidator,
  pageValidator
} = require("../MiddleWare/validators");

//http methods

// add product
// to do: admin auth
productRoute.post("/", isAdmin, upload.array("img"), productController.addProduct);

// update product
productRoute.put("/", isAdmin, productController.updateProduct);

// delete product
productRoute.delete(
  "/:id",
  isAdmin,
  idValidator,
  productController.deleteProduct
);

// get one product by _id
productRoute.get("/one/:id", idValidator, productController.getProductById);

// get all products
//  page is passed in query params [?page=]
productRoute.get("/", pageValidator, productController.getAllProducts);

// get all products in one category by category _id
productRoute.get(
  "/category/:id",
  getAllValidator,
  productController.getAllProductsInCategory
);

// get all products in one department by department _id
productRoute.get(
  "/department/:id",
  getAllValidator,
  productController.getAllProductsInDepartment
);

// to do VALIDATION???
// search products
productRoute.get("/search", productController.search);

module.exports = productRoute;
