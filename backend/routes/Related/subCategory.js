const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');


router.get('/', async (req, res) => {
  const categoryName = req.query.related_brand;
  try {
    const filteredProducts = await Product.find({
      $or: [
        { sub_category: { $regex: categoryName, $options: 'i' } }
      ]
    });
    if (filteredProducts.length === 0) {
      return res.json([]);
    }
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching sub-category products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
