import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import CardSlider from "../../components/CardSlider";
import "./cardSlider.css";
import { Link } from "react-router-dom";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`json/${category}.json`);
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="category-title-sec">
        <h2 className="category-title">{category}</h2>
        <Link to={`/shop?catid=sweets&subid=${category}`}>See All</Link>
      </div>
      <CardSlider>
        {products.slice(0, 15).map((item) => (
          <ProductCard
            key={item.id}
            img={item.images[0]}
            name={item.title}
            mrp={item.mrp}
            price={item.price}
            unit={item.unit}
            ProIDSearch={item.ProIDSearch}
            category={item.category}
            brand={item.brand}
          />
        ))}
      </CardSlider>
    </div>
  );
};

export default ProductList;
