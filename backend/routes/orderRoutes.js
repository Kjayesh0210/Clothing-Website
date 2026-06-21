const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/orderController");

router.post("/place", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/all", protect, isAdmin, getAllOrders);

router.put("/:id", protect, isAdmin, updateOrderStatus);

router.get("/:id", protect, getOrderById);

module.exports = router;
