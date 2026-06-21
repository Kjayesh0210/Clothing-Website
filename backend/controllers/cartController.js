const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        products: [],
      });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      const newQuantity = cart.products[itemIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: "Not enough stock",
        });
      }

      cart.products[itemIndex].quantity = newQuantity;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          message: "Not enough stock",
        });
      }

      cart.products.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.products.find((p) => p.product.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Not enough stock",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};
