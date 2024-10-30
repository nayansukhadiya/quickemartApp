import express from 'express';
const router = express.Router();
import Product from '../../models/Product.js';


router.get('/brandSimilar', async (req, res) => {
  const { proId, brand } = req.query;
  try {
    const filteredProducts = await Product.find({
      brand: { $regex: brand, $options: 'i' }
    });
    const newArray = filteredProducts.filter(product => product.p_id !== proId);
    if (newArray.length === 0) {
      return res.json([]);
    }
    res.json(newArray);
  } catch (error) {
    console.error('Error fetching brand similar products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
