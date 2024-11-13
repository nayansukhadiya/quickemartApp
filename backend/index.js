const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
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

const OrderIdGenerate = require("./routes/RazorPay/OrderIdGenerate.js");

const AllProducts = require("./routes/products/AllProducts.js");

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

app.use("/order", OrderIdGenerate);

app.use("/allpro", AllProducts);

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello Nayan Sukhadiya, your backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
