const Product = require("../../Model/product");


exports.getAllProductsInCategory = async (req, res, next) => {
  try {
    const category = req.params.id;
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;
    await Product.find({category})
      .populate("category", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .then((Products) => {
        res.status(200).json(Products);
      });
  } catch (err) {
    next(err);
  }
};