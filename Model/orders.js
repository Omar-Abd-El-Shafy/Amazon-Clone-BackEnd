const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    // paymentDetails: {}
    deliveryAddress: {
      building: {
        type: String,
      },
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },

    deliveryNotes: { type: String },
    deliveryDate: { type: Date },
    status: { type: String },
    products: [
      // get them from cart
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: String,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],

    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
