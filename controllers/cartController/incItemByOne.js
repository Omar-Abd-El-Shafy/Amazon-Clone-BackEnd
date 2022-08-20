const Cart = require("../../Model/cart");

exports.incItemByOne = async (req, res, next) => {
  try {
    //flag =0 means remove ,,, flag =1 means add
    const { product_id, flag } = req.body;
    const cart = await Cart.findOne({ user: req.user_id });
    const productIsThere = cart.products.findIndex((product) => {
      return product.product_id == product_id;
    });

    if (productIsThere > -1) {
      // cart.products[productIsThere].quantity = quantity;
      if (flag == 1) {
        cart.products[productIsThere].quantity += 1;
      } else if (flag == 0) {
        cart.products[productIsThere].quantity -= 1;
      }
      // await cart.updateOne(
      //     { _id: product.productBrief.product_id._id },
      //     { $inc: { stock: product.quantity } }
      //   );
      await cart.save().then((cart) => res.status(202).send("quantity updated"));

    } else {
      const product = { product_id, quantity: 1 };
      cart.products.push(product);
      await cart.save().then((cart) => res.status(202).send("quantity updated"));
      //edit in swagger
    }
  } catch (err) {
    next(err);
  }
};
