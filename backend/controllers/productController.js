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

  if (req.query.keyword) {
    filter.title = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const products = await Product.find(filter);

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

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addReview,
};
