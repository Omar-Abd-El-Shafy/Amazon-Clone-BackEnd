const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_id: { type: Number, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: Number, required: true },
    image_path: { type: [String], required: true },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    //ratings
    rating: { type: Number, default: 0 },
    //COD true or false: cash on delivery
    cod: { type: Boolean, default: false },
    //brand
    brand: { type: String, required: true },
    //weight
    weight: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
