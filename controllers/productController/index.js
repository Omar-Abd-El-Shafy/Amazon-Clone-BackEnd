//import all product methods
const { addProduct } = require("./addProduct");
const { deleteProduct } = require("./deleteProduct");
const { getAllProducts } = require("./getAllProducts");
const { getProductById } = require("./getProductById");
const { updateProduct } = require("./updateProduct");

//combine methods in productController obj
const productController = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};

//to use in productRoute
module.exports = productController;
