exports.cancelOrder = async (req, res, next) => {
  const { order_id, status } = req.body;
  try {
    const order = await findOne(order_id);
    order.status = status;
  } catch (err) {
    next(err);
  }
};
