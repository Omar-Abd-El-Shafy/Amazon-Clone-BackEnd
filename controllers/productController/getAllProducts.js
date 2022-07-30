const Product = require("../../Model/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    await Product.find().populate("category").then((Products) => {
      res.json(Products);
    });
  } catch (err) {
    next(err);
  }
};
