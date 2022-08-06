const Product = require("../../Model/product");


exports.getAllProductsInDepartment = async (req, res, next) => {
  try {
    const department = req.params.id;
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;
    await Product.find({department})
      .populate("department", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .then((Products) => {
        res.status(200).json(Products);
      });
  } catch (err) {
    next(err);
  }
};