const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);

router.post("/", protect, isAdmin, createCategory);

router.put("/:id", protect, isAdmin, updateCategory);

router.delete("/:id", protect, isAdmin, deleteCategory);

module.exports = router;
