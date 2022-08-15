const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.incItemByOne = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user_id });
    const productIsThere = cart.products.findIndex((product) => {
      return product.product_id == product_id;
    });

    if (productIsThere > -1) {
      // cart.products[productIsThere].quantity = quantity;

      cart.products[productIsThere].quantity += 1;

      // await cart.updateOne(
      //     { _id: product.productBrief.product_id._id },
      //     { $inc: { stock: product.quantity } }
      //   );
      await cart.save().then((cart) => res.status(200).send(cart));
    } else {
      let product = { product_id, quantity };
      cart.products.push(product);

      await cart.save().then((cart) => res.status(200).send(cart));
    }
  } catch (err) {
    next(err);
  }
};
