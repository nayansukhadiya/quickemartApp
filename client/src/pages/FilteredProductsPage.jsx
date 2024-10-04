import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import CardSlider from "../components/CardSlider";
import "../style/cardSlider.css";
import { Link } from "react-router-dom";

function FilteredProductsPage({ subCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/products?sub_category=${subCategory}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); // Fallback to empty array if data is not as expected
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [subCategory]);

  return (
    <div>
      <h1>Products in {subCategory}</h1>
      <div className="FeaturesHome">
        <div className="category-title-sec">
          <h2 className="category-title"></h2>
          <Link to={`/shop?id=${subCategory}`}>See All</Link>
        </div>
        <CardSlider>
          {/* Ensure products is not empty before mapping */}
          {products.length > 0 ? (
            products
              .slice(0, 15)
              .map((item) => (
                <HomeCard
                  key={item.p_id} 
                  ProIDSearch={item.p_id} 
                  img={item.img} 
                  name={item.name} 
                  price={item.price}
                  mrp={item.mrp} 
                  unit={item.unit} 
                  category={item.category} 
                  discount={item.discount} 
                />
              ))
          ) : (
            <p>No products available in this category.</p>
          )}
        </CardSlider>
      </div>
    </div>
  );
}

export default FilteredProductsPage;
