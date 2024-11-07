const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');

router.get("/", async (req, res) => {
  const query = req.query.q;
  const ResponseObj = {
    filteredProducts: null,
    brands: null,
    categories: null,
  };

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const filteredProducts = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { sub_category: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    });

    ResponseObj.filteredProducts = filteredProducts;

    const brandArr = [];
    const categoriesArr = [];

    // Collect brands and categories
    for (const element of filteredProducts) {
      brandArr.push(element.brand);
      categoriesArr.push(element.category);
    }

    // Get unique brands and categories
    const UniqueBrand = [...new Set(brandArr)];
    const UniqueSubCat = [...new Set(categoriesArr)];

    // Generate brand info with the total product count for each brand
    const brandInfo = UniqueBrand.map(brand => {
      const brandProductsCount = filteredProducts.filter(product => product.brand === brand).length;
      return {
        brandName: brand,
        TotalBrandPro: brandProductsCount
      };
    });

    ResponseObj.brands = brandInfo;
    ResponseObj.categories = UniqueSubCat;

    res.json(ResponseObj);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
