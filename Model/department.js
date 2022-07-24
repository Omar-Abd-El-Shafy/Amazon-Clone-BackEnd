const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  department_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  categories: [String],
});

module.exports = mongoose.model("Department", departmentSchema);
