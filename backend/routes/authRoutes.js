const express = require("express");

const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
  addAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimitMiddleware");

router.post("/register", registerLimiter, register);

router.post("/login", loginLimiter, login);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.put("/change-password", protect, changePassword);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/addresses", protect, getAddresses);

router.post("/addresses", protect, addAddress);

router.delete("/addresses/:id", protect, deleteAddress);

module.exports = router;
