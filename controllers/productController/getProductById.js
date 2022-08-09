const Product = require("../../Model/product");
const newError = require("../../utils/newError");

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("department", "name")
      .populate("category", "name");
    if (!product) {
      throw newError(404, "Product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
