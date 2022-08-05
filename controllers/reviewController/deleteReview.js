// Review model
const Review = require("../../Model/review");
const newError = require("../../utils/newError");

exports.deleteReview = async (req, res, next) => {
  const reviewId = req.body.id || req.params.id;
  await Review.findByIdAndDelete(reviewId)
    .then(async (review) => {
      if (review) {
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
      } else {
        throw newError(404, "Review not found");
      }
    })
    .catch((err) => {
      next(err);
    });
};
