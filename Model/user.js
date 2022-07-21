const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
  },
  name: {
    type: String,
    default: null,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isAlpha(val, "en-US", {ignore: " "});
      },
      message: "Invalid name",
    },
  },
  email: {
    type: String,
    lowercase: true,
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
    validate: {
      validator: (val) => {
        return validator.isMobilePhone(val);
      },
      message: "Invalid phone number",
    },
  },
  role: { type: Boolean },
});
//validate password before encrypting and saving in database
userSchema.pre("save", async function(next) { 
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
