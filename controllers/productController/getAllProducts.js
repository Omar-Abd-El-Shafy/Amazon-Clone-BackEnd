const Product = require("../../Model/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    await Product.find().then((Products) => {
      res.json(Products);
    });
  } catch (err) {
    next(err);
  }
};
