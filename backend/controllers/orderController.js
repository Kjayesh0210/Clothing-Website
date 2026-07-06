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

    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    doc.pipe(res);

    // ===========================
    // Header
    // ===========================

    doc.fontSize(28).fillColor("#111111").text("THREADDOT", 50, 50);

    doc.fontSize(12).fillColor("#666666").text("Premium Clothing Store");

    doc.fontSize(22).fillColor("#111111").text("INVOICE", 400, 50, {
      width: 150,
      align: "right",
    });

    doc.moveTo(50, 105).lineTo(550, 105).strokeColor("#DDDDDD").stroke();

    // ===========================
    // Order Details
    // ===========================

    let y = 125;

    doc.fontSize(12).fillColor("#222222");

    doc.text(
      `Invoice No : INV-${order._id.toString().slice(-6).toUpperCase()}`,
      50,
      y,
    );

    y += 20;

    doc.text(`Order ID : ${order._id}`, 50, y);

    y += 20;

    doc.text(`Payment ID : ${order.paymentId || "N/A"}`, 50, y);

    y += 20;

    doc.text(`Status : ${order.status}`, 50, y);

    y += 20;

    doc.text(
      `Date : ${new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`,
      50,
      y,
    );

    // ===========================
    // Billing Address
    // ===========================

    y += 50;

    doc.fontSize(15).fillColor("#111111").text("Billing Address", 50, y);

    y += 10;

    doc.moveTo(50, y).lineTo(550, y).strokeColor("#DDDDDD").stroke();

    y += 15;

    doc.fontSize(12).fillColor("#444444").text(order.address, 50, y, {
      width: 500,
    });

    // ===========================
    // Products Table
    // ===========================

    y += 70;

    doc.fontSize(15).fillColor("#111111").text("Order Items", 50, y);

    y += 20;

    doc.fontSize(12).fillColor("#666666");

    doc.text("Product", 50, y);

    doc.text("Qty", 300, y);

    doc.text("Price", 360, y);

    doc.text("Total", 470, y);

    y += 18;

    doc.moveTo(50, y).lineTo(550, y).strokeColor("#CCCCCC").stroke();

    y += 15;

    order.products.forEach((item) => {
      const total = item.quantity * item.product.price;

      doc.fontSize(12).fillColor("#222222");

      doc.text(item.product.title, 50, y, {
        width: 220,
      });

      doc.text(item.quantity.toString(), 305, y);

      doc.text(`₹${item.product.price.toLocaleString("en-IN")}`, 360, y);

      doc.text(`₹${total.toLocaleString("en-IN")}`, 470, y);

      y += 28;
    });

    // ===========================
    // Grand Total
    // ===========================

    y += 10;

    doc.moveTo(300, y).lineTo(550, y).strokeColor("#CCCCCC").stroke();

    y += 20;

    doc.fontSize(16).fillColor("#111111").text("Grand Total", 340, y);

    doc
      .fontSize(18)
      .fillColor("#111111")
      .text(`₹${order.totalAmount.toLocaleString("en-IN")}`, 470, y);

    // ===========================
    // Footer
    // ===========================

    y += 80;

    doc.moveTo(50, y).lineTo(550, y).strokeColor("#DDDDDD").stroke();

    y += 20;

    doc
      .fontSize(11)
      .fillColor("#777777")
      .text("Thank you for shopping with THREADDOT.", 50, y, {
        align: "center",
        width: 500,
      });

    y += 18;

    doc
      .fontSize(10)
      .fillColor("#999999")
      .text("Premium Fashion • THREADDOT", 50, y, {
        align: "center",
        width: 500,
      });

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
