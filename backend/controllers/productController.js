const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  const filter = {};
  if (req.query.minPrice) {
    filter.price = {
      ...filter.price,
      $gte: Number(req.query.minPrice),
    };
  }

  if (req.query.maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: Number(req.query.maxPrice),
    };
  }

  if (req.query.inStock === "true") {
    filter.stock = {
      $gt: 0,
    };
  }
  if (req.query.keyword) {
    filter.title = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  let sort = {};

  if (req.query.sort === "price-low") {
    sort.price = 1;
  }

  if (req.query.sort === "price-high") {
    sort.price = -1;
  }

  if (req.query.sort === "newest") {
    sort.createdAt = -1;
  }

  if (req.query.sort === "rating") {
    sort.rating = -1;
  }

  const products = await Product.find(filter).sort(sort);

  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json(product);
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
      name: "User",
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
    }).limit(5);

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
      stock: {
        $lte: 5,
      },
    });

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
