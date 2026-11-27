const { isValidObjectId } = require("mongoose");
const { createReviewService } = require("../services/reviewService");
const createReview = async () => {
  try {
    const review = await createReviewService(req.user.id, req.body);
    res.status(201).json(review);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createReview };
