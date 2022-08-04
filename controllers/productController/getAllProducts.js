const Product = require("../../Model/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;
    await Product.find()
      .populate("department", "name")
      .populate("category", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      // .sort({ name: "ascending" })
      .then((Products) => {
        res.status(200).json(Products);
      });
  } catch (err) {
    next(err);
  }
};
