const Cart = require("../../Model/cart");
const Product = require("../../Model/product");

exports.addItem = async (req, res, next) => {
  // const productsArr=req.body.products
  // const stock = productsArr.map((product)=>{
  //     await Product.findOne( {"product_id": product.product_id},{stock:1} )
  // }).then(res.send(stock))

  
  // you check first if product exists but this is overLOAD as extra query will be done on each request مش عارف اعمل ايه والله 
  const {cart_id, product_id, quantity } = req.body;
  //I'm working here on _id not on id trigger
  let cart = await Cart.findOne({ _id: cart_id });
  let product = { product_id, quantity };
  cart.products.push(product);
  await Cart.save()
    .then(() => res.status(200).send("item Added"))
    .catch((err) => next(err));
};
