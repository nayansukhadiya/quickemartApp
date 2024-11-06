const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

router.post('/', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        if (!req.body || !req.body.amount) {
            return res.status(400).send("Bad Request: Missing order details");
        }

        const options = {
            amount: Math.round(req.body.amount * 100), 
            currency: req.body.currency || "INR",
            receipt: req.body.receipt || "default_receipt_id"
        };

        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(400).send("Order creation failed");
        }

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
