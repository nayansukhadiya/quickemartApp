// category
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true }
});

categorySchema.index({ category: 1 });

const Category = mongoose.model('category', categorySchema);
export default Category;
