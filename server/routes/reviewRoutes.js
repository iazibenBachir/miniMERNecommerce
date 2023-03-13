const reviewController = require("../controllers/reviewController")
const requireAuth = require("../middlewares/authMiddleware")
const express = require("express");
const router = express.Router();

router.get("/:id", reviewController.get_product_reviews)
// require auth token for posting a review
router.use(requireAuth);
router.post("/", reviewController.post_review)
module.exports = router