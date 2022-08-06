const Cart = require("../../Model/cart");
exports.getCart = async (req, res, next) => {
  const user = req.user_id;

  try {
    const cart = await Cart.findOne({ user }).populate("products.product_id");

    if (cart.products.length > 0) {
      //looping on each product price to get total  bill
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.product_id.price;
      }, 0);

      res.status(200).send(cart);
    } else {
      res.status(404).send("cart has no products");
    }
  } catch (err) {
    next(err);
  }
};
