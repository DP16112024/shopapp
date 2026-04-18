const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name:     String,
  image:    String,
  price:    Number,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:         [orderItemSchema],
  shippingAddress: {
    address: String,
    city:    String,
    zip:     String,
    country: String,
  },
  totalPrice:    { type: Number, required: true },
  isPaid:        { type: Boolean, default: false },
  isDelivered:   { type: Boolean, default: false },
  paidAt:        Date,
  deliveredAt:   Date,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);