const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');

router.get('/', async (req, res) => {
    try {
        let products;
          products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
