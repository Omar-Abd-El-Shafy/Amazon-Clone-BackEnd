const Order = require("../Model/orders");
const Product = require("../Model/orders");

exports.updateStock = async (transaction_id, flag, status) => {
  try {
    const order = await Order.findOne({
      transaction_id: transaction_id,
    }).populate("products.productBrief.product_id", "id");

    //if flag true then increase the stock to get back to original stock
    if (flag) {
      order.products.map(async (product) => {
        await Product.updateOne(
          { _id: product.productBrief.product_id._id },
          { $inc: { stock: product.quantity } }
        );
      });
      //flag is false remove the stock as order is completed
    } else {
      order.products.map(async (product) => {
        await Product.updateOne(
          { _id: product.productBrief.product_id._id },
          { $inc: { stock: -product.quantity } }
        );
      });
    }
    order.status = status;
    await order.save().then((updatedOrder) => {
      res.status(200).send(updatedOrder);
    });
  } catch (err) {
    next(err);
  }
};
