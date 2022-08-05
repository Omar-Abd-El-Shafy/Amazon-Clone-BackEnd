//import all review methods
const { addReview } = require("./addReview");
const { getReviewById } = require("./getReviewById");
const { deleteReview } = require("./deleteReview");
const { getReviewsOnProduct } = require("./getReviewsOnProduct");
const { getReviewsByUser } = require("./getReviewsByUser");

//combine methods in obj
// review CRUD operations
const reviewController = {
  addReview,
  getReviewById,
  deleteReview,
  getReviewsOnProduct,
  getReviewsByUser,
};

//to use in Route
module.exports = reviewController;
