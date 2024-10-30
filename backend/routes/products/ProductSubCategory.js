import express from 'express';
const router = express.Router();
import Product from '../../models/Product.js';


router.get('/sub_category', async (req, res) => {
    const subCategory = req.query.name;
    try {
      let products;
      if (subCategory) {
        // Fetch products by sub_category from MongoDB
        products = await Product.find({ sub_category: subCategory });
      } else {
        // Fetch all products from MongoDB
        products = await Product.find();
      }
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
