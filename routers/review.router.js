const router = require('express').Router();

const reviewController = require('../controllers/review.controller');

router
    .route("/reviews")
    .post(reviewController.addReview)
    .get(reviewController.getReviews);

router
    .route("/reviews/:id")
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;