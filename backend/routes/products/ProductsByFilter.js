import express from 'express';
const router = express.Router();
import Product from '../../models/Product.js';

router.get('/filter', async (req, res) => {
    try {
      const { q, category } = req.query; 
      const filterCriteria = {
        $or: [] 
      };
  
      if (q) {
        filterCriteria.$or.push({ name: { $regex: q, $options: 'i' } }); 
      }
  
      if (category) {
        filterCriteria.$or.push({ sub_category: { $regex: category, $options: 'i' } }); // Filter by the given category
      }
  
      // Execute the query with the built filter criteria
      const filteredProducts = await Product.find(filterCriteria);
      res.json(filteredProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;