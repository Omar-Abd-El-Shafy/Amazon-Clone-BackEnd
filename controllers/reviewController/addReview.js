const Review = require("../../Model/review");
const Product = require("../../Model/product");
const newError = require("../../utils/newError");
const orders = require("../../Model/orders");

exports.addReview = async (req, res, next) => {
  try {
    // Get user input
    const user = req.user_id;
    const { product, rating, title, comment } = req.body;

    // check if valid product
    const validProduct = await Product.findById(product);

    if (!validProduct) {
      throw newError(404, "Product not found");
    }

    // check if user already reviewed this product
    const oldReview = await Review.findOne({ product, user });
    if (oldReview) {
      throw newError(409, "Already reviewed");
    }

    // check if user bought the product
    const bought = await orders.findOne({
      user,
      status: { $in: ["delivered", "shipped"] },
      "products.productBrief.product_id": product,
    });
    if (!bought) {
      throw newError(403, "Product must be bought before review");
    }

    // save in db
    const review = await Review.create({
      user,
      product,
      rating,
      title,
      comment,
    });

    // update rating in product
    const newRating = await Review.aggregate([
      // get all reviews for current product
      { $match: { product: review.product } },
      // group reviews into 1 group by product _id, calc avg, return it in average
      { $group: { _id: "$product", average: { $avg: "$rating" } } },
    ]);

    // update rating to the new avg
    await Product.findByIdAndUpdate(
      product,
      { rating: newRating[0].average },
      { new: true }
    );

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};
