const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.js');

router.get("/search", async (req, res) => {
  const query = req.query.q;
  const ResponseObj = {
    filteredProducts: null,
    brands: null,
    categories: null,
    price: { MinPrice: null, MaxPrice: null } // Removed units
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
    const PriceArr = [];

    for (const element of filteredProducts) {
      brandArr.push(element.brand);
      categoriesArr.push(element.category);
      PriceArr.push(element.price);
    }

    const UniqueBrand = [...new Set(brandArr)];
    const UniqueSubCat = [...new Set(categoriesArr)];
    const UniquePrice = [...new Set(PriceArr)];

    ResponseObj.brands = UniqueBrand;
    ResponseObj.categories = UniqueSubCat;
    ResponseObj.price.MinPrice = Math.min(...UniquePrice);
    ResponseObj.price.MaxPrice = Math.max(...UniquePrice);

    res.json(ResponseObj);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
