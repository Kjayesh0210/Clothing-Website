const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only",
    });
  }

  next();
};

module.exports = isAdmin;
