const Review = require("../../Model/review");
const newError = require("../../utils/newError");

exports.getReviewById = async (req, res, next) => {
  try {
    const review_id = req.params.id;
    await Review.findById(review_id)
      // .select("user rating title comment date")
      .populate("user", "name")
      .then((review) => {
        if (review) {
          res.status(200).json(review);
        } else {
          throw newError(404, "Review not found");
        }
      });
  } catch (err) {
    next(err);
  }
};
