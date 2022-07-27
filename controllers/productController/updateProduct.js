const Product = require("../../Model/product");
const User = require("../../Model/user");
const isAdmin = require("../../MiddleWare/adminAuth");
// method to update user name or email or phone
// update password has its own method

// const decoded = jwt.verify(token, config.TOKEN_KEY); // here we match the token we got with the secret key we have

// req.user_id = decoded.user_id;

exports.updateProduct = async (req, res, next) => {

  try {
    await Product.findOneAndUpdate(
      { product_id: req.body.product_id },
      req.body,
      {
        new: true,
      }
    )
      .then((updatedProduct) => {
        res.status(200).send(updatedProduct);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
