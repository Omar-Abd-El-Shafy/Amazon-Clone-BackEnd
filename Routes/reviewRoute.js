//route associated with "/review" in server
const express = require("express");
const reviewRoute = express.Router();
//controller
const reviewController = require("../controllers/reviewController");
//midllewares
const auth = require("../MiddleWare/auth");
const isAdmin = require("../MiddleWare/adminAuth");
const {
  addReviewValidator,
  idValidator,
  getReviewsValidator,
} = require("../MiddleWare/validators");

// add review
reviewRoute.post("/", auth, addReviewValidator, reviewController.addReview);

// delete review: admin only
reviewRoute.delete(
  ["/", "/:id"],
  isAdmin,
  idValidator,
  reviewController.deleteReview
);

// get review by _id
reviewRoute.get(["/", "/:id"], idValidator, reviewController.getReviewById);

// get all reviews on product by product _id
reviewRoute.get(
  "/product/:id",
  getReviewsValidator,
  reviewController.getReviewsOnProduct
);

// get user reviews by user _id: admin only
reviewRoute.get(
  "/user/:id",
  getReviewsValidator,
  isAdmin,
  reviewController.getReviewsByUser
);

module.exports = reviewRoute;
