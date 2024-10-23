import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import CardSlider from "../components/CardSlider";
import "../style/cardSlider.css";
import { Link } from "react-router-dom";
import config from "../config";

function FilteredProductsPage({ subCategory }) {
  const [products, setProducts] = useState([]);
console.log(`${config.apiUrl}/products?sub_category=${subCategory}`)
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/products?sub_category=${subCategory}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); 
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
          <Link to={`/shop?catid=sweets&subid=${subCategory}`}>See All</Link>
        </div>
        <CardSlider>
          {products.length > 0 ? (
            products
              .slice(0, 25)
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
                  brand={item.brand} 
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
