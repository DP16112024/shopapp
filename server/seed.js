const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const products = [
  { name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones', price: 99.99, category: 'Electronics', stock: 50, image: 'https://via.placeholder.com/300?text=Headphones', rating: 4.5, numReviews: 12 },
  { name: 'Running Shoes', description: 'Lightweight performance running shoes', price: 74.99, category: 'Footwear', stock: 30, image: 'https://via.placeholder.com/300?text=Shoes', rating: 4.2, numReviews: 8 },
  { name: 'Backpack', description: 'Water-resistant 30L travel backpack', price: 49.99, category: 'Accessories', stock: 75, image: 'https://via.placeholder.com/300?text=Backpack', rating: 4.7, numReviews: 20 },
  { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard, cherry switches', price: 129.99, category: 'Electronics', stock: 20, image: 'https://via.placeholder.com/300?text=Keyboard', rating: 4.8, numReviews: 35 },
  { name: 'Yoga Mat', description: 'Non-slip premium yoga mat', price: 29.99, category: 'Sports', stock: 100, image: 'https://via.placeholder.com/300?text=Yoga+Mat', rating: 4.3, numReviews: 15 },
  { name: 'Coffee Maker', description: 'Programmable 12-cup coffee maker', price: 59.99, category: 'Kitchen', stock: 40, image: 'https://via.placeholder.com/300?text=Coffee+Maker', rating: 4.1, numReviews: 9 },
];

const seed = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Products seeded!');
  process.exit();
};

seed();