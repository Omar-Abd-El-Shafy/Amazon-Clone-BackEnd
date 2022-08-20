const Order = require("../../Model/orders");

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    // .populate(
    //   "products.productBrief.product_id",
    //   "stock -_id"
    // );

    if (!order) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).send(order);
    }
  } catch (err) {
    next(err);
  }
};
