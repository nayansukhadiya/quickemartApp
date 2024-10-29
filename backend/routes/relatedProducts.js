import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';


router.get('/similar', async (req, res) => {
  const { proId, subCategory } = req.query;
  try {
    const filteredProducts = await Product.find({
      sub_category: { $regex: subCategory, $options: 'i' }
    });
    const currentIndex = filteredProducts.findIndex(product => product.p_id === proId);
    const totalCount = filteredProducts.length;
    
    let similarProducts = [];
    const rightCount = Math.min(15, totalCount - (currentIndex + 1)); 
    if (currentIndex >= 0 && currentIndex < totalCount) {
      similarProducts.push(...filteredProducts.slice(currentIndex + 1, currentIndex + 1 + rightCount));
      const remainingCount = 15 - similarProducts.length;
      if (remainingCount > 0) {
        const leftCount = Math.min(remainingCount, currentIndex);
        similarProducts.unshift(...filteredProducts.slice(currentIndex - leftCount, currentIndex));
      }
    }
    if (similarProducts.length < 15) {
      const additionalCount = 15 - similarProducts.length;
      const additionalFromRight = Math.min(additionalCount, totalCount - (currentIndex + 1 + rightCount));
      similarProducts.push(...filteredProducts.slice(currentIndex + 1 + rightCount, currentIndex + 1 + rightCount + additionalFromRight));
      if (similarProducts.length < 15) {
        const remainingFromLeft = 15 - similarProducts.length;
        similarProducts.unshift(...filteredProducts.slice(currentIndex - remainingFromLeft, currentIndex));
      }
    }
    res.json(similarProducts.slice(0, 15));
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
