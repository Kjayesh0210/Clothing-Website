const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  requestReturn,
  getOrderById,
  getDashboardStats,
  generateInvoice,
} = require("../controllers/orderController");

router.post("/place", protect, placeOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/all", protect, isAdmin, getAllOrders);

router.get("/admin/stats", protect, isAdmin, getDashboardStats);

router.put("/:id", protect, isAdmin, updateOrderStatus);

router.put("/:id/cancel", protect, cancelOrder);

router.put("/:id/request-return", protect, requestReturn);

router.get("/:id/invoice", protect, generateInvoice);

router.get("/:id", protect, getOrderById);

module.exports = router;
