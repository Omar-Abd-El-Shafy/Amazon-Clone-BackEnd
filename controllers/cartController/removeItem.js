const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.removeItem = async (req, res, next) => {
  // you check first if product exists but this is overLOAD as extra query will be done on each request مش عارف اعمل ايه والله
  const { product_id } = req.body;
  //I'm working here on _id not on id trigger
  // let cart = await Cart.findOne({ _id: cart_id });
  let cart = await Cart.findOne({ user: req.user_id });
  let newProductArr = cart.products.filter((product) => {
    return product.product_id != product_id;
  });

  cart.products = newProductArr;
  await cart
    .save()
    .then((cart) => res.status(200).send("product removed"))
    .catch((err) => next(err));
};
