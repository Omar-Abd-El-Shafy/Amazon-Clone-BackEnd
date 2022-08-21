const Cart = require("../../Model/cart");
exports.getCart = async (req, res, next) => {
  try {
    const user = req.user_id;
    const cart = await Cart.findOne({ user }).populate("products.product_id");

    // looping on each product price to get total  bill
    let bill = cart.products.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product_id.price;
    }, 0);
    bill = Number.parseFloat(bill).toFixed(2);
    cart.bill = bill;
    res.status(200).send(cart);

    // await cart.save().then((cart) => {
    // });
  } catch (err) {
    next(err);
  }
};
