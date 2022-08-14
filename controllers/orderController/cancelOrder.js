const Order = require("../../Model/orders");
exports.cancelOrder = async (req, res, next) => {
  const { order_id, status } = req.body;
  try {
    const order = await Order.findOne(order_id);
    order.status = status;
  } catch (err) {
    next(err);
  }
};
