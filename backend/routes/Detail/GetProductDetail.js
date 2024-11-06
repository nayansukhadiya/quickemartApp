const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');

router.get('/', async (req, res) => {
    const p_id = req.query.p_id; // Assuming you pass p_id as a query parameter
    try {
        let product;
        if (p_id) {
            // Fetch product by p_id from MongoDB
            product = await Product.findOne({ p_id: p_id }); // Use findOne for a single object
        } else {
            return res.status(400).json({ error: 'p_id query parameter is required' });
        }
  
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;