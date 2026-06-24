const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      name: 1,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.name = req.body.name;

    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
