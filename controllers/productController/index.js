//import all product methods
const { addProduct } = require("./addProduct");
const { deleteProduct } = require("./deleteProduct");
const { getAllProducts } = require("./getAllProducts");
const { getProductById } = require("./getProductById");
const { updateProduct } = require("./updateProduct");
const { getAllProductsInCategory } = require("./getAllProductsInCategory");
const { getAllProductsInDepartment } = require("./getAllProductsInDepartment");
const { search } = require("./search");

//combine methods in productController obj
const productController = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getAllProductsInCategory,
  getAllProductsInDepartment,
  search,
};

//to use in productRoute
module.exports = productController;
