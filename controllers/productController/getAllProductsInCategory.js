const Product = require("../../Model/product");


exports.getAllProductsInCategory = async (req, res, next) => {
  try {
    const category = req.body.category_id || req.params.category_id;
    const itemsPerPage = 10,
      page = req.params.page || 0;
    await Product.find({category})
      .populate("category", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .sort({ name: "ascending" })
      .then((Products) => {
        res.json(Products);
      });
  } catch (err) {
    next(err);
  }
};