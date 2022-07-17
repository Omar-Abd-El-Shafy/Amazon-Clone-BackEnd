const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: null,
    validate: {
      validator: (val) => {
        return validator.isAlphanumeric(val);
      },
      message: "Invalid first name",
    },
  },
  last_name: {
    type: String,
    default: null,
    validate: {
      validator: (val) => {
        return validator.isAlphanumeric(val);
      },
      message: "Invalid last name",
    },
  },
  email: {
    type: String,
    requird: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isStrongPassword(val);
      },
      message: "Weak password",
    },
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isMobilePhone(val);
      },
      message: "Invalid phone number",
    },
  },
  admin: { type: Boolean },
  user_id: {
    type: Number,
    unique: true
  }
});

module.exports = mongoose.model("User", userSchema);
