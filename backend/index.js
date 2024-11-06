const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Product = require('./models/Product.js');
const Category = require('./models/Category.js');

const relatedProductsRoute = require('./routes/Related/relatedProducts.js');
const brandSimilarProductRoute = require('./routes/Related/brandSimilar.js');
const subCategoryRoute = require('./routes/Related/subCategory.js');
const ProRelatedBrand = require('./routes/Related/ProRelatedBrand.js');

const SearchData = require('./routes/Search/SearchData.js');
const ProductBySubCategory = require('./routes/products/ProductSubCategory.js');
const ProductByFilter = require('./routes/products/ProductsByFilter.js');

const GetBrandProducts = require('./routes/Brand/GetBrandProducts.js');

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

// Use the routes
app.use('/related', relatedProductsRoute);
app.use('/related', brandSimilarProductRoute);
app.use('/related', subCategoryRoute); 
app.use('/related', ProRelatedBrand);

app.use('/search', SearchData);
app.use('/products', ProductBySubCategory);
app.use('/products', ProductByFilter);

app.use('/brand',GetBrandProducts);

// Categories route
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

// Detail page route
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

app.get('/', (req, res) => {
  console.log(req.headers);
  res.send('Hello, your backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
