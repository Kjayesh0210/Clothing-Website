const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.post("/add", protect, addToWishlist);

router.get("/", protect, getWishlist);

module.exports = router;
