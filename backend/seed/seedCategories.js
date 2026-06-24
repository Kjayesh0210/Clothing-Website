const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Category = require("../models/Category");

dotenv.config();

const categories = [
  { name: "Cargo Pants" },
  { name: "Hoodies" },
  { name: "Jackets" },
  { name: "Jeans" },
  { name: "Joggers" },
  { name: "Shirts" },
  { name: "Shorts" },
  { name: "T-Shirts" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("Categories Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedCategories();
