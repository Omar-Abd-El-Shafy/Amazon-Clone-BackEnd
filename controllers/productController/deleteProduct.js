const Product = require("../../Model/product");
const newError = require("../../utils/newError");

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw newError(404, "Product not found");
    }
    res.status(200).send(`Product ${product.name} deleted.`);
  } catch (err) {
    next(err);
  }
};
