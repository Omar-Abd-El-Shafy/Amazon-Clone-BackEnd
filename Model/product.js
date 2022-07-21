const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_id: { type: Number },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image_path: { type: String },
  department: {
    department_id: { type: Number },
    department_name: { type: String },
  },
  category: {
    category_id: { type: Number },
    category_name: { type: String },
  },
  //ratings
  //reviews
  //COD true or false


  //brand
  //weight

  //sorting:
  //ratings// rating number
  //price    //low to high //high to low

  
  //filter:
  //department
  //brand
  //avilabilty

  
});

module.exports = mongoose.model("Product", productSchema);
