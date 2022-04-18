const Review = require("../models/review.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const reviewController = {
  addReview: catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({ status: "success", data: newReview });
  }),

  getReviews: catchAsync(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({ status: "success", data: reviews });
  }),

  updateReview: catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    if (!review) return next(new AppError("Review không tồn tại", 404));

    res.status(200).json({ status: "success", message: "update thành công" });
  }),

  deleteReview: catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) return next(new AppError("Review không tồn tại", 404));

    res.status(200).json({ status: "success", message: "delete thành công" });
  }),
};

module.exports = reviewController;