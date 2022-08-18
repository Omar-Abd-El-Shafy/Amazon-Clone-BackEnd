// const Order = require("../../Model/orders");
// exports.cancelOrder = async (req, res, next) => {
//   const { order_id, status } = req.body;
//   try {
//     const order = await Order.findOne(order_id);
//     order.status = status;
//   } catch (err) {
//     next(err);
//   }
// };

const Order = require("../../Model/orders");
const Product = require("../../Model/product");
//shoudl check if order exist !
exports.cacnelOrder = async (req, res, next) => {
  const { order_id, status } = req.body;
  if (status != "canceled") {
    res.status(403).send("admin can only cancel order");
  }
  try {
    const order = await Order.findById(order_id).populate(
      "products.productBrief.product_id"
    );
    if (order) {
      order.status = status;
      order.products.map(async (product) => {
        await Product.updateOne(
          { _id: product.productBrief.product_id._id },
          { $inc: { stock: product.quantity } }
        );
      });

      await order.save().then((updatedOrder) => {
        res.status(200).send(updatedOrder);
      });
    } else {
      res.status(404).send("order Doesn't exist");
    }
  } catch (err) {
    next(err);
  }
};
