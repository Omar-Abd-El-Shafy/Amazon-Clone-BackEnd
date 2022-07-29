const Product = require("../../Model/product");

// method to update user name or email or phone
// update password has its own method
exports.updateProduct = async (req, res, next) => {
  await Product.findOneAndUpdate(
    { product_id: req.body.product_id },
    req.body,
    {
      new: true,
    }
  )
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
