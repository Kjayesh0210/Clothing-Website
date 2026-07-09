const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        size: {
          type: String,
          default: "",
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    paymentId: String,
    estimatedDelivery: Date,
    paidAt: Date,
    requestedAt: Date,

    returnRequest: {
      requested: {
        type: Boolean,
        default: false,
      },

      reason: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Refunded"],
        default: "Pending",
      },

    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
