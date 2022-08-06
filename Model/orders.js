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
        type: String,
      },
    },

    deliveryNotes: { type: String },
    deliveryDate: { type: Date },
    status: { type: String },
    products: [
      {
        productBrief: {
          name: { type: String },
          price: { type: Number },
          image_path: { type: String },
        },

        quantity: {
          type: String,
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
