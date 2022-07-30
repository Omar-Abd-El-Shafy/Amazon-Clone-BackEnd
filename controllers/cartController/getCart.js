const Cart = require("../../Model/cart");
exports.getCart = async (req, res, next) => {
  const user = req.body.user_id;

  try {
    const cart = await Cart.findOne({ user }).populate("products.productId");

    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Cart Doesn't Exist");
    }
  } catch (err) {
    next(err);
  }
};
