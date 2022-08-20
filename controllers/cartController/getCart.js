const Cart = require("../../Model/cart");
exports.getCart = async (req, res, next) => {
  try {
    const user = req.user_id;
    const cart = await Cart.findOne({ user }).populate("products.product_id");

    // looping on each product price to get total  bill
    cart.bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product_id.price;
    }, 0);

    await cart.save().then((cart) => {
      res.status(200).send(cart);
    });
  } catch (err) {
    next(err);
  }
};
