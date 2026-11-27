const { Router } = require("express");
const { createReview } = require("../controllers/reviewController");
const authenticateToken = require("../middlewares/auth");
const router = Router();

router.post("/", authenticateToken, createReview);

module.exports = router;
