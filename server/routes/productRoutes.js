const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    const products = [
      { name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones', price: 99.99, category: 'Electronics', stock: 50, image: 'https://via.placeholder.com/300?text=Headphones', rating: 4.5, numReviews: 12 },
      { name: 'Running Shoes', description: 'Lightweight performance running shoes', price: 74.99, category: 'Footwear', stock: 30, image: 'https://via.placeholder.com/300?text=Shoes', rating: 4.2, numReviews: 8 },
      { name: 'Backpack', description: 'Water-resistant 30L travel backpack', price: 49.99, category: 'Accessories', stock: 75, image: 'https://via.placeholder.com/300?text=Backpack', rating: 4.7, numReviews: 20 },
      { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 129.99, category: 'Electronics', stock: 20, image: 'https://via.placeholder.com/300?text=Keyboard', rating: 4.8, numReviews: 35 },
      { name: 'Yoga Mat', description: 'Non-slip premium yoga mat', price: 29.99, category: 'Sports', stock: 100, image: 'https://via.placeholder.com/300?text=Yoga+Mat', rating: 4.3, numReviews: 15 },
      { name: 'Coffee Maker', description: 'Programmable 12-cup coffee maker', price: 59.99, category: 'Kitchen', stock: 40, image: 'https://via.placeholder.com/300?text=Coffee+Maker', rating: 4.1, numReviews: 9 },
    ];
    await Product.insertMany(products);
    res.json({ message: 'Products seeded!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
