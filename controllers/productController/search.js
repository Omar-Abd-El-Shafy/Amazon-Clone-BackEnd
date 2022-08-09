const Product = require("../../Model/product");
const { filterProducts } = require("../../utils/filterProducts");

exports.search = async (req, res, next) => {
  try {
    // get user inputs
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;

    const { name, sortBy } = req.query;

    // build search conditions
    const filter = filterProducts(req.query);

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // choose sorting condition
    const sort = {};

    if (sortBy === "Price: Low to High") {
      sort.price = "ascending";
    } else if (sortBy === "Price: High to Low") {
      sort.price = "descending";
    } else if (sortBy === "Avg. Customer review") {
      sort.rating = "descending";
    }

    // execute query
    await Product.find(filter)
      .select("name rating price image_path")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .sort(sort)
      .then((Products) => {
        if (Products.length) {
          res.status(200).json(Products);
        } else {
          res.status(404).send("Products not found");
        }
      });
  } catch (err) {
    next(err);
  }
};
