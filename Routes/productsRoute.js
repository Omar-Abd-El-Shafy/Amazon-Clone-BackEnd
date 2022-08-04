//route associated with "/product" in server
const express = require("express");
const productRoute = express.Router();
//controller
const productController = require("../controllers/productController");
//midllewares
const isAdmin = require("../MiddleWare/adminAuth");
const upload = require("../MiddleWare/S3uploadImages");

productRoute.post("/add", upload.array("img"), productController.addProduct);
productRoute.delete("/delete", isAdmin, productController.deleteProduct);
productRoute.get("/getAllProducts", productController.getAllProducts);
productRoute.get("/getProductById", productController.getProductById);
productRoute.put("/updateProduct", isAdmin, productController.updateProduct);
const { commonValidator } = require("../MiddleWare/validators/commonValidator");
const {
  pageValidator,
  getAllProductsInCategoryValidator,
  getAllProductsInDepartmentValidator,
} = require("../MiddleWare/validators");

//http methods
// to do: enhance end-points

// add product
// to do: admin auth
productRoute.post("/add", upload.array("img"), productController.addProduct);

// update product
productRoute.put("/updateProduct", isAdmin, productController.updateProduct);

// delete product
productRoute.delete("/delete", isAdmin, productController.deleteProduct);

// get one product by id
productRoute.get("/getProductById", productController.getProductById);

// get all products
//  page is passed in query params [?page=]
productRoute.get(
  "/getAllProducts",
  pageValidator,
  productController.getAllProducts
);

// get all products in one category by category id
productRoute.get(
  ["/getAllProductsInCategory", "/getAllProductsInCategory/:category_id"],
  getAllProductsInCategoryValidator,
  productController.getAllProductsInCategory
);

// get all products in one department by department id
productRoute.get(
  ["/getAllProductsInDepartment", "/getAllProductsInDepartment/:department_id"],
  getAllProductsInDepartmentValidator,
  productController.getAllProductsInDepartment
);

// to do VALIDATION???
// search products
productRoute.get("/search", productController.search);

module.exports = productRoute;
