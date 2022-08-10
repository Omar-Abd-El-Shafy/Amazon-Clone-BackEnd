const Review = require("../../Model/review");
const newError = require("../../utils/newError");

exports.getReviewsOnProduct = async (req, res, next) => {
  try {
    const product = req.params.id;
    const itemsPerPage = req.query.itemsPerPage || 5,
      page = req.query.page - 1 || 0;
      
    await Review.find({ product })
      // .select("user rating title comment date")
      .populate("user", "name")
      .limit(itemsPerPage)
      .skip(page * itemsPerPage)
      .then((review) => {
        if (review) {
          res.status(200).json(review);
        } else {
          throw newError(404, "Reviews not found");
        }
      });
  } catch (err) {
    next(err);
  }
};
