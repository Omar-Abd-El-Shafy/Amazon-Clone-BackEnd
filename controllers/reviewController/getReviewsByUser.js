const Review = require("../../Model/review");
const User = require("../../Model/user");
const newError = require("../../utils/newError");

exports.getReviewsByUser = async (req, res, next) => {
  try {
    const user = req.body.id || req.params.id;

    // check if user exists
    let oldUser = await User.findOne({ _id: user });

    if (!oldUser) {
      throw newError(404, "User not found");
    }

    await Review.find({ user })
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
