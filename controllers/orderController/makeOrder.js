const mongoose = require("mongoose");
const conn = mongoose.connection;

const Cart = require("../../Model/cart");
const Product = require("../../Model/product");
const Order = require("../../Model/orders");
// const { connection } = require("../../DataSource/database");
const makeOrder = async (req, res, next) => {
  //starting transaction session
  let bill = 0;
  let CreatedOrder = null;
  const session = await conn.startSession();
  try {
    //start of transaction
    // await session.startTransaction();
    const user = req.user_id;
    const TransactionEndOrder = await session.withTransaction(
      async () => {
        const cart = await Cart.findOne({ user }, "-bill -_id", {
          session,
        }).populate("products.product_id", "stock price name image_path");
        //check Stock
        let noStockProducts = [];
        // console.log(cart.products[1].product_id.stock);
        noStockProducts = cart.products.filter((product) => {
          // console.log(product.quantity);
          // console.log(cart.products[0].product_id.stock);
          return product.quantity > product.product_id.stock;
        });

        if (noStockProducts.length > 0) {
          await session.abortTransaction();
          res.status(400).send(noStockProducts);
        } else {
          //...........order creation part start.............................

          //looping on each product price to get total  bill
          bill = cart.products.reduce((acc, curr) => {
            return acc + curr.quantity * curr.product_id.price;
          }, 0);

          const products = cart.products.map((product) => {
            return {
              productBrief: {
                product_id: product.product_id,
                name: product.product_id.name,
                price: product.product_id.price,
                image_path: product.product_id.image_path[0],
              },
              quantity: product.quantity,
            };
          });
          //setting delivery date 7 days after current date
          const myCurrentDate = new Date();
          const deliveryDate = new Date(myCurrentDate);
          deliveryDate.setDate(deliveryDate.getDate() + 7);
          // getting rest of data from req body
          let { deliveryAddress, paymentMethod } = req.body;
          let status,
            shippingFee = 21;
          if (paymentMethod == "cash") {
            status = "shipped";
            shippingFee += 9;
          } else {
            status = "pendingPayment";
          }

          bill += shippingFee;

          CreatedOrder = await Order.create(
            [
              {
                user,
                products,
                deliveryAddress,
                status,
                deliveryDate,
                shippingFee,
                bill,
                paymentMethod,
              },
            ],
            { session }
          );

          //..........update stock depending on cart start .....................
          for (const product of cart.products) {
            await Product.updateOne(
              { _id: product.product_id._id },
              { $inc: { stock: -product.quantity } },
              { session }
            );
          }
          //..........update stock depending on cart end .......................
        } // esle bracket
      },
      {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
      }
    );
    session.endSession();
    res.status(201).send(CreatedOrder);
  } catch (err) {
    console.log("in catch ...........");
    next(err);
  }
};
module.exports = { makeOrder };
