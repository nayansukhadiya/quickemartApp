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
//related brand product get
app.get('/related/similar', async (req, res) => {
  const { proId, subCategory } = req.query; 
  try {
    // Fetch products based on the subCategory
    const filteredProducts = await Product.find({
      sub_category: { $regex: subCategory, $options: 'i' }
    });

    // Find the index of the specified product
    const currentIndex = filteredProducts.findIndex(product => product.p_id === proId);

    // Get the total count of filtered products
    const totalCount = filteredProducts.length;

    // Prepare to store the similar products
    let similarProducts = [];
    const rightCount = Math.min(12, totalCount - (currentIndex + 1)); 
    if (currentIndex >= 0 && currentIndex < totalCount) {
      // Get products to the right
      similarProducts.push(...newArray.slice(currentIndex + 1, currentIndex + 1 + rightCount));

      const remainingCount = 12 - similarProducts.length; 
      if (remainingCount > 0) {
        const leftCount = Math.min(remainingCount, currentIndex);
        // Get products to the left
        similarProducts.unshift(...newArray.slice(currentIndex - leftCount, currentIndex));
      }
    }

    // If the total is still less than 12, include additional products from either side
    if (similarProducts.length < 12) {
      const additionalCount = 12 - similarProducts.length;
      // Check if there's room to get more from the right
      const additionalFromRight = Math.min(additionalCount, totalCount - (currentIndex + 1 + rightCount));
      similarProducts.push(...newArray.slice(currentIndex + 1 + rightCount, currentIndex + 1 + rightCount + additionalFromRight));

      // If still less than 12, add from the left
      if (similarProducts.length < 12) {
        const remainingFromLeft = 12 - similarProducts.length;
        similarProducts.unshift(...newArray.slice(currentIndex - remainingFromLeft, currentIndex));
      }
    }

    // Send the similar products as a JSON response
    res.json(similarProducts.slice(0, 12)); // Ensure to return only the first 12 products
  } catch (error) {
    console.error('Error fetching brands:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// given data by the brand match 
app.get('/related/brandSimilar', async (req, res) => {
  const { proId, brand } = req.query; 
  try {
    // Fetch products based on the subCategory
    const filteredProducts = await Product.find({
      brand: { $regex: brand, $options: 'i' }
    });

    // Filter out the product with the specified proId
    const newArray = filteredProducts.filter(product => product.p_id !== proId); 

    // Check if filteredProducts is empty
    if (newArray.length === 0) {
      return res.json([]); // Return an empty array if no similar products are found
    }

    res.json(newArray); // Send the filtered products as a JSON response
  } catch (error) {
    console.error('Error fetching brands:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// given data by the sub category match 
app.get('/related', async (req, res) => {
  const categoryName = req.query.related_brand; 
  try {
    const filteredProducts = await Product.find({
      $or: [
        { sub_category: { $regex: categoryName, $options: 'i' } }
      ]
    });

    // Check if filteredProducts is empty
    if (filteredProducts.length === 0) {
      return res.json([]); // Return an empty array if no products are found
    }

    res.json(uniqueBrands); // Send unique brands as a JSON response
  } catch (error) {
    console.error('Error fetching brands:', error); // Log the error for debugging
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

//similar brand get from  sub category

app.get('/brand', async (req, res) => {
  const categoryName = req.query.related_brand;  // Get category from the query
  const excludedBrand = req.query.brand;         // Get the brand to exclude from the query
  
  try {
    // Find products based on the related category (sub_category)
    const filteredProducts = await Product.find({
      sub_category: { $regex: categoryName, $options: 'i' }  // Case-insensitive matching
    });

    // Check if no products are found
    if (filteredProducts.length === 0) {
      return res.json([]); // Return an empty array if no products are found
    }

    // Extract all brand names from the products
    const brandArr = filteredProducts.map(item => item.brand);

    // Filter out the brand that needs to be excluded
    const filteredBrands = brandArr.filter(productBrand => productBrand !== excludedBrand);

    // Get unique brands using Set
    const uniqueBrands = Array.from(new Set(filteredBrands)); // Convert Set back to an array

    // Send the unique brands as a JSON response
    res.json(uniqueBrands);
  } catch (error) {
    console.error('Error fetching brands:', error); // Log the error for debugging
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

app.get('/', (req, res) => {
  res.send('Hello, your backend is running!');
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
