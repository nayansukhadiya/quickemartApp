import React, { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import CardSlider from "../components/CardSlider";
import "../style/cardSlider.css";
import { Link } from "react-router-dom";
import bg from "../assets/img/categoryBg.png";
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
        <Link to={`/shop?id=${category}`}>See All</Link>
      </div>
      <CardSlider>
        {products.slice(0, 15).map((item) => (
          <HomeCard
            key={item.id}
            img={item.images[0]}
            name={item.title}
            mrp={item.mrp}
            price={item.price}
            subTitle={item.subTitle}
            ProIDSearch={item.ProIDSearch}
            category={item.category}
          />
        ))}
      </CardSlider>
    </div>
  );
};

export default ProductList;
