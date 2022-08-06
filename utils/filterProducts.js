exports.filterProducts = (query) => {
  const {
    department,
    category,
    brand,
    rating,
    minPrice,
    maxPrice,
    includeOutOfStock,
  } = query;

  // build search conditions
  const filter = {};

  if (department) {
    filter.department = department;
  }

  if (category) {
    filter.category = category;
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

  return filter;
};
