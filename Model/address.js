const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requied: true,
    },
    building: {
      type: String,
      requied: true,
    },
    street: {
      type: String,
      requied: true,
    },
    city: {
      type: String,
      requied: true,
    },
    state: {
      type: String,
      requied: true,
    },
    country: {
      type: String,
      requied: true,
    },
    zipCode: {
      type: String,
      requied: true,
    },
    phone: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Create a virtual property `fullAddress` that's computed from address fields.
addressSchema.virtual("fullAddress").get(function () {
  return `${this.building}, ${this.street}, ${this.city}, ${this.state}, ${this.country}, ${this.zipCode}`;
});

module.exports = mongoose.model("Address", addressSchema);
