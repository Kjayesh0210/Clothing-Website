const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user.id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [],
      });
    }

    if (!wishlist.products.some((id) => id.toString() === productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({
    user: req.user.id,
  }).populate("products");

  res.json(wishlist);
};

module.exports = {
  addToWishlist,
  getWishlist,
};
