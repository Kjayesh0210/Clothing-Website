const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { title, category, price, gender, sizes } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!category?.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (gender && !["Male", "Female", "Unisex"].includes(gender)) {
      return res.status(400).json({
        message: "Invalid gender",
      });
    }

    if (sizes?.some((item) => item.stock < 0)) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      category,
      keyword,
      minPrice,
      maxPrice,
      inStock,
      sort,
      gender,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (gender) {
      filter.gender = gender;
    }
    if (keyword?.trim()) {
      filter.title = {
        $regex: keyword.trim(),
        $options: "i",
      };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (inStock === "true") {
      filter["sizes.stock"] = {
        $gt: 0,
      };
    }

    let sortOption = {};

    switch (sort) {
      case "price-low":
        sortOption.price = 1;
        break;

      case "price-high":
        sortOption.price = -1;
        break;

      case "newest":
        sortOption.createdAt = -1;
        break;

      case "rating":
        sortOption.rating = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const currentPage = Math.max(1, Number(page) || 1);

    const pageLimit = Math.max(1, Number(limit) || 12);

    const skip = (currentPage - 1) * pageLimit;

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      currentPage,
      totalPages: Math.ceil(totalProducts / pageLimit),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name",
    );

    console.log(product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.log("GET PRODUCT ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const { title, category, price, gender, sizes } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (category !== undefined && !category.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    if (gender && !["Male", "Female", "Unisex"].includes(gender)) {
      return res.status(400).json({
        message: "Invalid gender",
      });
    }

    if (sizes?.some((item) => item.stock < 0)) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }
    Object.assign(product, req.body);

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (!comment?.trim()) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id,
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "Already reviewed",
      });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.json({
      message: "Review Added",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({
        createdAt: -1,
      })
      .limit(4);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const relatedProducts = await Product.find({
      category: product.category,

      _id: {
        $ne: product._id,
      },
    }).limit(4);

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const products = await Product.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    })
      .select("title images price")
      .limit(5);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      sizes: {
        $elemMatch: {
          stock: {
            $lte: 5,
          },
        },
      },
    }).sort({ updatedAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getRelatedProducts,
  searchProducts,
  getLowStockProducts,
};
