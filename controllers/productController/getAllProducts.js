const Product = require("../../Model/product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const itemsPerPage = 10,
      page = req.params.page || 0;
    await Product.find()
      .populate("department", "name")
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
