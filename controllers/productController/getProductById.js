const Product = require("../../Model/product");

exports.getProductById = async (req, res, next) => {
  try {
    await Product.findById(req.params.id).then((product) => {
      res.status(200).json(product);
    });
  } catch (err) {
    next(err);
  }
};
