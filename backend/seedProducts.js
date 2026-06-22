const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("YOUR_MONGO_URI");

const categories = ["hoodie", "tshirt", "jeans", "shirt", "jacket"];

const products = [];

for (let i = 1; i <= 200; i++) {
  products.push({
    name: `Product ${i}`,
    description: `Description for Product ${i}`,
    price: Math.floor(Math.random() * 4000) + 500,
    stock: Math.floor(Math.random() * 50),
    category: categories[Math.floor(Math.random() * categories.length)],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    rating: (Math.random() * 5).toFixed(1),
  });
}

async function seed() {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products inserted`);

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();
