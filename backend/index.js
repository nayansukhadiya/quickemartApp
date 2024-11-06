const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay"); // Add Razorpay
const Product = require("./models/Product.js");
const Category = require("./models/Category.js");

const relatedProductsRoute = require("./routes/Related/relatedProducts.js");
const brandSimilarProductRoute = require("./routes/Related/brandSimilar.js");
const subCategoryRoute = require("./routes/Related/subCategory.js");
const ProRelatedBrand = require("./routes/Related/ProRelatedBrand.js");

const SearchData = require("./routes/Search/SearchData.js");
const ProductBySubCategory = require("./routes/products/ProductSubCategory.js");
const ProductByFilter = require("./routes/products/ProductsByFilter.js");

const GetCategories = require("./routes/category/GetCategories.js");

const GetBrandProducts = require("./routes/Brand/GetBrandProducts.js");

const GetProductDetail = require("./routes/Detail/GetProductDetail.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });

// Use the routes
app.use("/related", relatedProductsRoute);
app.use("/related", brandSimilarProductRoute);
app.use("/related", subCategoryRoute);
app.use("/related", ProRelatedBrand);

app.use("/search", SearchData);
app.use("/products", ProductBySubCategory);
app.use("/products", ProductByFilter);

app.use("/brand", GetBrandProducts);

app.use("/categories", GetCategories);

app.use("/detail", GetProductDetail);

// Order Creation Route with Razorpay
app.post("/order", async (req, res) => {  // Use POST instead of GET
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    if (!req.body || !req.body.amount) {
      return res.status(400).send("Bad Request: Missing order details");
    }

    const options = {
      amount: Math.round(req.body.amount * 100), // Amount in paise
      currency: req.body.currency || "INR",
      receipt: req.body.receipt || "default_receipt_id",
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(400).send("Order creation failed");
    }

    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Root Route
app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello Nayan Sukhadiya, your backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
