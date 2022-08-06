const Product = require("../../Model/product");
const { filterProducts } = require("../../utils/filterProducts");

exports.getAllProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;

    // to filter products
    // if no filters are passed, get all productsF
    const filter = filterProducts(req.query);

    await Product.find(filter)
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
