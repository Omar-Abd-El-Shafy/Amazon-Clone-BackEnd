//get all orders of USer
const Order = require("../../Model/orders");
//shoudl check if order exist !
exports.getAllOrders = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    Order.find({ user: user_id })
      // .populate("products.productBrief.product_id", "stock -_id")
      .then((order) => {
        res.status(200).send(order);
      });
  } catch (err) {
    next(err);
  }
};
