const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.addItem = async (req, res, next) => {
  // const productsArr=req.body.products
  // const stock = productsArr.map((product)=>{
  //     await Product.findOne( {"product_id": product.product_id},{stock:1} )
  // }).then(res.send(stock))

  // you check first if product exists but this is overLOAD as extra query will be done on each request مش عارف اعمل ايه والله
  const { product_id, quantity, user_id } = req.body;
  //I'm working here on _id not on id trigger
  let cart = await Cart.findOne({ user: user_id });
  const productIsThere = cart.products.findIndex((product) => {
    return product.product_id == product_id;
  });
  // console.log("is product there");
  // console.log(productIsThere);
  if (productIsThere > -1) {
    cart.products[productIsThere].quantity = quantity;

    cart.bill = cart.products.reduce((acc, curr) => {
      return (
        acc + curr.quantity * curr.price
        // (async () => {
        //   Number(await Product.findById(product_id).select("price -_id"));
        // })()
      );
    }, 0);

    await cart
      .save()
      .then((cart) => res.status(200).send(cart))
      .catch((err) => next(err));
  } else {
    let product = { product_id, quantity };
    cart.products.push(product);
    cart.bill = cart.products.reduce((acc, curr) => {
      return (
        acc + curr.quantity * curr.price
        // (async () => {
        //   Number(await Product.findById(product_id).select("price -_id"));
        // })()
      );
    }, 0);

    await cart
      .save()
      .then((cart) => res.status(200).send(cart))
      .catch((err) => next(err));
  }
};
