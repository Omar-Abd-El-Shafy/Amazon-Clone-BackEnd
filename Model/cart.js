const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },

    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        // price: {
        //   type: Number,
        //   required: true,
        //   default: 0,
        // },
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

module.exports = mongoose.model("Cart", cartSchema);
