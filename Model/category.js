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
      department_id: { type: Number, required: true },
      department_name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
