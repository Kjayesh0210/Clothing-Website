const express = require("express");

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  deleteReview,
  getFeaturedProducts,
  getRelatedProducts,
  searchProducts,
  getLowStockProducts,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.post("/", protect, isAdmin, createProduct);

router.get("/search", searchProducts);

router.get("/low-stock", protect, isAdmin, getLowStockProducts);

router.get("/:id", getProduct);

router.put("/:id", protect, isAdmin, updateProduct);

router.delete("/:id", protect, isAdmin, deleteProduct);

router.post("/:id/review", protect, addReview);

router.delete("/:id/review/:reviewId", protect, deleteReview);

router.get("/:id/related", getRelatedProducts);

module.exports = router;
