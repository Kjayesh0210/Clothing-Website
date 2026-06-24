const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      default: "DRIPSTORE",
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    sizes: [
      {
        size: {
          type: String,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: String,

        rating: Number,

        comment: String,
      },
    ],

    numReviews: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    originalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 90,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unisex"],
      default: "Unisex",
      required: true,
    },
    color: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    material: {
      type: String,
      default: "",
    },
    fit: {
      type: String,
      enum: ["Slim", "Regular", "Relaxed", "Oversized"],
      default: "Regular",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
