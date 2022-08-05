const Review = require("../../Model/review");
const Product = require("../../Model/product");
const newError = require("../../utils/newError");

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
      throw newError(403, "Already reviewed");
    }

    // save in db
    await Review.create({
      user,
      product,
      rating,
      title,
      comment,
    }).then(async function (review) {
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
      ).then((productUpdated) => {
        console.log(productUpdated.rating);
        res.status(201).json(review);
      });
    });
  } catch (err) {
    next(err);
  }
};
