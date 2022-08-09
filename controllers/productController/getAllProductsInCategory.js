const Product = require("../../Model/product");
const { filterProducts } = require("../../utils/filterProducts");

exports.getAllProductsInCategory = async (req, res, next) => {
  try {
    const category = req.params.id;
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;

    // to filter products
    // if no filters are passed, get all productsF
    const filter = filterProducts(req.query);

    filter.category = category;

    await Product.find({ filter })
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
