const express = require("express");
const router = express.Router();
const Category = require("../../models/Category.js");

router.get("/", async (req, res) => {
  const categoryName = req.query.cat_name;
  try {
    let category;
    if (categoryName) {
      category = await Category.find({
        category: { $regex: new RegExp(categoryName, "i") }, // 'i' for case-insensitive
      });
    } else {
      category = await Category.find();
    }

    res.json(category); // Return the fetched category as JSON
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
