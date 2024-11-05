const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');

router.get('/', async (req, res) => {
    const brandName = req.query.name;
    try {
      let products;
      if (brandName) {
        products = await Product.find({ brand: brandName });
      } else {
        products = await Product.find();
      }
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;