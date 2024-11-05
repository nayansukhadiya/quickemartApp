const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pid: { type: String, required: true },
  price: { type: Number, required: true },
  title2: { type: String, required: true },
  brand: { type: String, required: true },
  img: { type: String, required: true },
  unit: { type: String, required: true },
  discount: { type: String, required: true },
  mrp: { type: Number, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, required: true },
});

productSchema.index({ sub_category: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
