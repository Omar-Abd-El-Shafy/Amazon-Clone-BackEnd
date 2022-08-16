const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.addItem = async (req, res, next) => {
  // const productsArr=req.body.products
  // const stock = productsArr.map((product)=>{
  //     await Product.findOne( {"product_id": product.product_id},{stock:1} )
  // }).then(res.send(stock))

  // you check first if product exists but this is overLOAD as extra query will be done on each request مش عارف اعمل ايه والله
  const { product_id, quantity } = req.body;
  // console.log(req.user_id);
  let cart = await Cart.findOne({ user: req.user_id });
  // console.log(cart);
  const productIsThere = cart.products.findIndex((product) => {
    return product.product_id == product_id;
  });

  if (productIsThere > -1) {
    cart.products[productIsThere].quantity = quantity;
    // cart.products[productIsThere].price = price;
    // cart.bill = cart.products.reduce((acc, curr) => {
    //   return (
    //     acc + curr.quantity * curr.price
    //     // .......................... IIFE pattern maybe used
    //     // (async () => {
    //     //   (await Product.findById(product_id).select("price -_id"));
    //     // })()
    //     // .......................... IIFE pattern maybe used
    //   );
    // }, 0);

    await cart
      .save()
      .then((cart) => res.status(202).send("item added"))
      .catch((err) => next(err));
  } else {
    let product = { product_id, quantity };
    cart.products.push(product);
    // cart.bill = cart.products.reduce((acc, curr) => {
    //   return (
    //     acc + curr.quantity * curr.price
    //    // .......................... IIFE pattern maybe used
    //    // (async () => {
    //     //   (await Product.findById(product_id).select("price -_id"));
    //     // })()
    //   // .......................... IIFE pattern maybe used
    //   );
    // }, 0);

    await cart
      .save()
      .then((cart) => res.status(202).send("item added"))
      .catch((err) => next(err));
  }
};
