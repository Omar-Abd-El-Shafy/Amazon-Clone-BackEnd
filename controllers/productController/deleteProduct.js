const Product = require("../../Model/product");

exports.deleteProduct = async (req, res, next) => {
  try {
    Product.findByIdAndDelete(req.params.id)
      .then((product) =>
        res.status(200).send(`Product ${product.name} deleted.`)
      )
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
