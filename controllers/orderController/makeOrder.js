const Cart = require("../../Model/cart");
const Product = require("../../Model/product");
const Order = require("../../Model/orders");
let bill = 0;
const makeOrder = async (req, res, next) => {
  try {
    const user = req.user_id;
    const cart = await Cart.findOne({ user }, "-bill -_id").populate(
      "products.product_id",
      "stock price name image_path"
    );

    //check Stock
    let noStockProducts = [];
    // console.log(cart.products[1].product_id.stock);
    noStockProducts = cart.products.filter((product) => {
      // console.log(product.quantity);
      // console.log(cart.products[0].product_id.stock);
      return product.quantity > product.product_id.stock;
    });

    if (noStockProducts.length > 0) {
      // I have to remove the error items from cart before responding
      // const inStockProducts = cart.products.filter((product) => {
      //   return product.quantity <= product.product_id.stock;
      // });

      res.status(400).send(noStockProducts);
    } else {
      //looping on each product price to get total  bill
      bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.product_id.price;
      }, 0);

      const products = cart.products.map((product) => {
        return {
          productBrief: {
            product_id: product.product_id,
            name: product.product_id.name,
            price: product.product_id.price,
            image_path: product.product_id.image_path[0],
          },
          quantity: product.quantity,
        };
      });
      //setting delivery date 7 days after current date
      const myCurrentDate = new Date();
      const deliveryDate = new Date(myCurrentDate);
      deliveryDate.setDate(deliveryDate.getDate() + 7);
      // getting rest of data from req body
      const { deliveryAddress, status, deliveryNote } = req.body;

      await Order.create({
        user,
        products,
        deliveryAddress,
        deliveryNote,
        status,
        deliveryDate,
        bill,
      }).then((order) => {
        res.status(200).send(order);
      });
      // res.send(productsBreifArr);
      // res.status(200).send(OrderBill.toString());
    }

    // take product ids from cart , just the ids...
    // first u need to check that the auntity sent are in stock ..
    // if first true  then check on all the prices , recalcualte the total bill again
    // then if order succeded nad payment succeded u need to empty the cart
  } catch (err) {
    next(err);
  }
};
module.exports = { makeOrder };
