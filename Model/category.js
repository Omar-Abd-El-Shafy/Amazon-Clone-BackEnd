const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category_id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    image_path: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
