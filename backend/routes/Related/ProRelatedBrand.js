import express from 'express';
const router = express.Router();
import Product from '../../models/Product.js';

//similar brand get from  sub category

router.get('/brand', async (req, res) => {
    const categoryName = req.query.related_brand; 
    const excludedBrand = req.query.brand;        

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
  


export default router;