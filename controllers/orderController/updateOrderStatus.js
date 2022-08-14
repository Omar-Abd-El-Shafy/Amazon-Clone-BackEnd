const Order = require("../../Model/orders");
const Product = require("../../Model/product");
//shoudl check if order exist !
exports.updateOrderStatus = async (req, res, next) => {
  const { order_id, status } = req.body;
  try {
    const order = await Order.findById(order_id).populate(
      "products.productBrief.product_id",
      "_id"
    );
    order.status = status;

    if (status === "canceled") {
      order.products.map(async (product) => {
        await Product.updateOne(
          { _id: product.productBrief.product_id._id },
          { $inc: { stock: product.quantity } }
        );
      });
    }

    await order.save().then((updatedOrder) => {
      res.status(200).send(updatedOrder);
    });
  } catch (err) {
    next(err);
  }
};
