const Product = require("../../Model/product");

exports.getProductById = async (req, res, next) => {
  try {
    await Product.findOne({ product_id: req.body.product_id }).then(
      (Product) => {
        res.json(Products);
      }
    );
  } catch (err) {
    next(err);
  }
};
