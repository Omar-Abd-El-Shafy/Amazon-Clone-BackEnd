const Order = require("../Model/orders");
const Product = require("../Model/orders");

exports.updateStock = async (transaction_id, status) => {
  try {
    const order = await Order.findOne({
      transaction_id: transaction_id,
    }).populate("products.productBrief.product_id", "_id");

    //if flag true then increase the stock to get back to original stock
    order.products.map(async (product) => {
      await Product.updateOne(
        { _id: product.productBrief.product_id._id },
        { $inc: { stock: product.quantity } }
      );
    });
    //flag is false remove the stock as order is completed

    order.status = status;
    await order.save();
  } catch (err) {
    next(err);
  }
};
