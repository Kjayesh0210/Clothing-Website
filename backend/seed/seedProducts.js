const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");
const Category = require("../models/Category");

const products = require("./productsData");

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const categories = await Category.find();

    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.deleteMany();

    await Product.insertMany(formattedProducts);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();