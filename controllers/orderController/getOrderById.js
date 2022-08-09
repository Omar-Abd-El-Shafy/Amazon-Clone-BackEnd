const Order = require("../../Model/orders");
const Product = require("../../Model/product");
//shoudl check if order exist !
exports.getOrderById = async (req, res, next) => {
  const { order_id } = req.body;
  try {
    const order = await Order.findById(order_id)
      .populate("products.productBrief.product_id", "stock -_id")
      .then((order) => {
        res.status(200).send(order);
      });
  } catch (err) {
    next(err);
  }
};
