const express = require("express");

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getRelatedProducts,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/:id", getProduct);

router.post("/", protect, isAdmin, createProduct);

router.put("/:id", protect, isAdmin, updateProduct);

router.delete("/:id", protect, isAdmin, deleteProduct);

router.post("/:id/review", protect, addReview);

router.get("/:id/related", getRelatedProducts);

module.exports = router;
