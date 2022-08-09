const Product = require("../../Model/product");

exports.updateProduct = async (req, res, next) => {
  await Product.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        const error = new Error("product not found enter a valid id");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(updatedProduct);
    })
    .catch((err) => {
      next(err);
    });
};
