const Order = require("../models/Order");
const Cart = require("../models/cart");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const Product = require("../models/Product");
const PDFDocument = require("pdfkit");

const placeOrder = async (req, res) => {
  try {
    const { address, paymentId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    for (const item of cart.products) {
      const selectedSize = item.product.sizes.find((s) => s.size === item.size);

      if (!selectedSize) {
        return res.status(400).json({
          message: `Size ${item.size} not found for ${item.product.title}`,
        });
      }

      if (item.quantity > selectedSize.stock) {
        return res.status(400).json({
          message: `${item.product.title} (${item.size}) has only ${selectedSize.stock} items left`,
        });
      }
    }

    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const estimatedDelivery = new Date();

    estimatedDelivery.setDate(estimatedDelivery.getDate() + 10);

    const order = await Order.create({
      user: req.user.id,
      products: cart.products,
      totalAmount,
      address,
      paymentId,
      isPaid: true,
      paidAt: Date.now(),
      estimatedDelivery,
    });

    const user = await User.findById(req.user.id);

    try {
      await sendEmail(
        user.email,
        "Order Placed",
        `
        <h2>
          Your order has been placed successfully.
        </h2>

        <p>
          Order ID:
          ${order._id}
        </p>

        <p>
          Amount:
          ₹${totalAmount}
        </p>

        <p>
          Thank you for shopping with us.
        </p>
        `,
      );
    } catch (error) {
      console.log("Order Email Error:", error.message);
    }

    for (const item of cart.products) {
      const sizeObj = item.product.sizes.find((s) => s.size === item.size);

      if (sizeObj) {
        sizeObj.stock -= item.quantity;
      }

      await item.product.save();
    }

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
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .sort({
        createdAt: -1,
      });

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

    const user = await User.findById(order.user);

    if (status === "Shipped") {
      try {
        await sendEmail(
          user.email,
          "Order Shipped",
          `
          <h2>
            Your order is on the way.
          </h2>

          <p>
            Order ID: ${order._id}
          </p>
          `,
        );
      } catch (error) {
        console.log("Shipment Email Error:", error.message);
      }
    }

    if (status === "Delivered") {
      try {
        await sendEmail(
          user.email,
          "Order Delivered",
          `
          <h2>
            Your order has been delivered.
          </h2>

          <p>
            Order ID: ${order._id}
          </p>

          <p>
            Thank you for shopping with us.
          </p>
          `,
        );
      } catch (error) {
        console.log("Delivery Email Error:", error.message);
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product",
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (order.status !== "Pending" && order.status !== "Confirmed") {
      return res.status(400).json({
        message: "Order cannot be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    for (const item of order.products) {
      const sizeObj = item.product.sizes.find((s) => s.size === item.size);

      if (sizeObj) {
        sizeObj.stock += item.quantity;
      }

      await item.product.save();
    }

    const user = await User.findById(order.user);

    try {
      await sendEmail(
        user.email,
        "Order Cancelled",
        `
        <h2>Your order has been cancelled.</h2>

        <p>Order ID: ${order._id}</p>
        `,
      );
    } catch (error) {
      console.log(error.message);
    }

    res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const requestReturn = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (order.status !== "Delivered") {
      return res.status(400).json({
        message: "Only delivered orders can be returned",
      });
    }

    if (order.returnRequest?.requested) {
      return res.status(400).json({
        message: "Return already requested",
      });
    }

    order.returnRequest = {
      requested: true,
      reason,
      status: "Pending",
      requestedAt: Date.now(),
    };

    await order.save();

    res.json({
      success: true,
      message: "Return request submitted",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    doc.fontSize(22).text("DRIPSTORE Invoice");

    doc.moveDown();

    doc.text(`Order ID: ${order._id}`);
    doc.text(`Payment ID: ${order.paymentId}`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Date: ${order.createdAt.toDateString()}`);

    doc.moveDown();

    doc.text(`Address:`);
    doc.text(order.address);

    doc.moveDown();

    doc.text("Products:");

    order.products.forEach((item) => {
      doc.text(
        `${item.product.title}
         | Qty: ${item.quantity}
         | ₹${item.product.price}`,
      );
    });

    doc.moveDown();

    doc.text(`Total: ₹${order.totalAmount}`);

    doc.end();
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
  cancelOrder,
  requestReturn,
  getOrderById,
  getDashboardStats,
  generateInvoice,
};
