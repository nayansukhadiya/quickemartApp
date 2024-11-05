const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true }
});

categorySchema.index({ category: 1 });

const Category = mongoose.model('category', categorySchema);

// Use CommonJS syntax to export the model
module.exports = Category;
