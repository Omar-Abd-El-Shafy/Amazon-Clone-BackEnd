const Product = require("../../Model/product");

exports.getProductById = async (req, res, next) => {
  try {
    await Product.findById(req.body.product_id).then((Product) => {
      res.json(Product);
    });
  } catch (err) {
    next(err);
  }
};
