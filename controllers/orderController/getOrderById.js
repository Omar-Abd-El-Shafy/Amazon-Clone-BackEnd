const Order = require("../../Model/orders");
//shoudl check if order exist !
exports.getOrderById = async (req, res, next) => {
  try {
    Order.findById(req.params.id)
      .populate("products.productBrief.product_id", "stock -_id")
      .then((order) => {
        console.log(order);
        res.status(200).send(order);
      });
  } catch (err) {
    next(err);
  }
};
