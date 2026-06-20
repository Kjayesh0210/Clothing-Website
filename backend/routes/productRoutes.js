const express = require("express");

const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", protect, isAdmin, createProduct);

router.put("/:id", protect, isAdmin, updateProduct);

router.delete("/:id", protect, isAdmin, deleteProduct);

router.post("/:id/review", protect, addReview);

module.exports = router;
