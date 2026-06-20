const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const { address } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user.id,

      products: cart.products,

      totalAmount,

      address,
    });

    cart.products = [];

    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user.id,
  })
    .populate("products.product")
    .sort({
      createdAt: -1,
    });

  res.json(orders);
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};