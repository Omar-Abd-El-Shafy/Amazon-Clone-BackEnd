const Cart = require("../../Model/cart");
exports.emptyCart = async (req, res, next) => {
  const user = req.user_id;

  try {
    const cart = await Cart.findOne({ user });
    let arr = [];
    cart.products = arr;
    cart.bill = 0;
    await cart.save().then((cart) => res.status(200).send("cart is empty"));
  } catch (err) {
    next(err);
  }
};
