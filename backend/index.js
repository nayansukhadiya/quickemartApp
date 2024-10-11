import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import Product from './models/Product.js'; 
import Category from './models/Category.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
  });

// Sample route for searching products
app.get('/products/search', async (req, res) => {
  const query = req.query.q

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const filteredProducts = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { sub_category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for fetching products by sub_category
app.get('/products', async (req, res) => {
  const subCategory = req.query.sub_category;
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

// categories wise saw
app.get('/categories', async (req, res) => {
  const categoryName = req.query.cat_name; 
  try {
    let category;
    if (categoryName) {
      category = await Category.find({
        category: { $regex: new RegExp(categoryName, 'i') } // 'i' for case-insensitive
      });
    } else {
      category = await Category.find();
    }

    res.json(category); // Return the fetched category as JSON
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/products/filter', async (req, res) => {

  try {
    const { q, category } = req.query; // Destructure q and category from req.query
    const filterCriteria = {
      $or: [] // Initialize an array for OR conditions
    };

    // If a name (q) is provided, use it for filtering
    if (q) {
      filterCriteria.$or.push({ name: { $regex: q, $options: 'i' } }); // Search by name
    }

    // If a category is provided, include it in the criteria
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





//detail page 
app.get('/detail', async (req, res) => {
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
