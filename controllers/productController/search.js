const Product = require("../../Model/product");

exports.search = async (req, res, next) => {
  try {
    // get user inputs
    const itemsPerPage = req.query.itemsPerPage || 8,
      page = req.query.page - 1 || 0;

    const {
      name,
      department_id,
      category_id,
      brand,
      rating,
      minPrice,
      maxPrice,
      includeOutOfStock,
      sortBy,
    } = req.query;

    // build search conditions
    const filter = {};

    if (name) {
      filter.name = { $regex:  name , $options: "i" };
    }

    if (department_id) {
      filter.department = department_id;
    }

    if (category_id) {
      filter.category = category_id;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (rating) {
      filter.rating = { $gte: rating };
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    if (!includeOutOfStock) {
      filter.stock = { $ne: 0 };
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
          res.status(404).send("No products found");
        }
      });
  } catch (err) {
    next(err);
  }
};
