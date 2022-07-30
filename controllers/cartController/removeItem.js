const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.createCart = async (req, res, next) => {
  // you check first if product exists but this is overLOAD as extra query will be done on each request مش عارف اعمل ايه والله
  const { cart_id, product_id, quantity } = req.body;
  //I'm working here on _id not on id trigger
  // let cart = await Cart.findOne({ _id: cart_id });
  let cart = await Cart.findOne({ _id: cart_id });
  let newProductArr = cart.products.filter((product) => {
    product.product_id != product_id;
  });

  cart.products.push(newProductArr);

  await cart.save();
};
