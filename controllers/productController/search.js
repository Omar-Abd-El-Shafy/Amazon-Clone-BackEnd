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

    // get number of pages
    const productsNum = await Product.countDocuments(filter);
    const pages = Math.ceil(productsNum / itemsPerPage);

    // execute query
    const products = await Product.find(filter)
      .populate("department", "name")
      .populate("category", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .sort(sort);

    if (products.length) {
      res.status(200).json({ pages, products });
    } else {
      res.status(404).send("Products not found");
    }
  } catch (err) {
    next(err);
  }
};
