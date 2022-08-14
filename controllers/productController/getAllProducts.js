const Product = require("../../Model/product");
const { filterProducts } = require("../../utils/filterProducts");

exports.getAllProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;

    // to filter products
    // if no filters are passed, get all products
    const filter = filterProducts(req.query);

    // get number of pages
    const productsNum = await Product.countDocuments(filter);
    const pages = Math.ceil(productsNum / itemsPerPage);

    const products = await Product.find(filter)
      .populate("department", "name")
      .populate("category", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage);

    res.status(200).send({ pages, products });
  } catch (err) {
    next(err);
  }
};
