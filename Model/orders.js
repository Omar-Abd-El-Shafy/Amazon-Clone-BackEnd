const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        type: String,
      },
    },
    transaction_id: { type: String, default: "" },

    deliveryNotes: { type: String },
    deliveryDate: { type: Date },
    status: {
      type: String,
      enum: ["pendingPayment", "canceled", "delivered", "shipped"],
      default: "pendingPayment",
    },
    products: [
      {
        productBrief: {
          product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          name: { type: String },
          price: { type: Number },
          image_path: { type: String },
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],

    bill: {
      // must be calcualated to be sure
      type: Number,
      required: true,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
