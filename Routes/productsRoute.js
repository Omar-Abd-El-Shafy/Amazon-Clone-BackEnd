//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
//controller
const productController = require("../controllers/productController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const upload = require("../MiddleWare/S3uploadImages");

const {
  pageValidator,
  getAllProductsInCategoryValidator,
  getAllProductsInDepartmentValidator,
} = require("../MiddleWare/validators");

//http methods

// add product
// to do: admin auth
productRoute.post("/", upload.array("img"), productController.addProduct);

// update product
productRoute.put("/", isAdmin, productController.updateProduct);

// delete product
productRoute.delete("/", isAdmin, productController.deleteProduct);

// get one product by _id
productRoute.get("/one", productController.getProductById);

// get all products
//  page is passed in query params [?page=]
productRoute.get(
  "/",
  pageValidator,
  productController.getAllProducts
);

// get all products in one category by category _id
productRoute.get(
  ["/category", "/category/:category_id"],
  getAllProductsInCategoryValidator,
  productController.getAllProductsInCategory
);

// get all products in one department by department _id
productRoute.get(
  ["/department", "/department/:department_id"],
  getAllProductsInDepartmentValidator,
  productController.getAllProductsInDepartment
);

// to do VALIDATION???
// search products
productRoute.get("/search", productController.search);

module.exports = productRoute;
