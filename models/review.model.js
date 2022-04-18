const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review là trường bắt buộc"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Story: {
    type: mongoose.Schema.ObjectId,
    ref: "Story",
    required: [true, "Cần phải review truyện nào đó"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review phải của ai đó"],
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
