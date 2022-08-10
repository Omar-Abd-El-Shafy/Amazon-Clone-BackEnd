// Review model
const Review = require("../../Model/review");
const newError = require("../../utils/newError");

exports.deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;
  await Review.findByIdAndDelete(reviewId)
    .then(async (review) => {
      if (!review) {
        throw newError(404, "Review not found");
      }

      // calc new rating to update rating in product
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

      res.status(200).json("Review deleted");
    })
    .catch((err) => {
      next(err);
    });
};
