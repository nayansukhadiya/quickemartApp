import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import CardSlider from "../../components/CardSlider/CardSlider";
import { Link } from "react-router-dom";
import config from "../../config";

function FilteredProductsPage({ subCategory }) {
  const [products, setProducts] = useState([]);
console.log(`${config.apiUrl}/products/sub_category?name=${subCategory}`)
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/products/sub_category?name=${subCategory}`
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
          <h2 className="category-title">{subCategory}</h2>
          <Link to={`/shop?catid=sweets&subid=${subCategory}`}>See All</Link>
        </div>
        <CardSlider>
          {products.length > 0 ? (
            products
              .slice(0, 25)
              .map((item) => (
                <ProductCard
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
