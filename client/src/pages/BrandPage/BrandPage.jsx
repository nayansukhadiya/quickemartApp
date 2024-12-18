import React, { useEffect, useRef, useState } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";
import CircleLoader from "../../components/Loaders/CircleLoader";
import ProductCard from "../../components/ProductCard";
import BackBtn from "../../components/BackBtn/BackBtn";
import "./brandPage.css";

function BrandPage() {
  const fac = new FastAverageColor();
  const imgRef = useRef(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("name");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [averageColor, setAverageColor] = useState("");
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/brand?name=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        // Optionally, you can set an error state to display an error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchBrands();
  }, [query]); // Added `query` to the dependency array to re-run if `query` changes.
  const handleImageLoad = () => {
    const imgElement = imgRef.current;
    if (imgElement) {
      fac
        .getColorAsync(imgElement)
        .then((color) => {
          const rgbaWithAlpha = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.53)`;
          setAverageColor(rgbaWithAlpha);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  return (
    <>
      <BackBtn
        LinkName={query
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      />
      <div className="BrandPageSecTopSec"
       style={{
        backgroundColor: averageColor || "transparent",
        transition: "background-color 0.3s ease",
      }}>
        <img
          src={require(`../../assets/images/Brand_Logo/${query
            .toLowerCase()
            .replace(/ /g, "_")}.png`)}
          alt={query}
          crossOrigin="anonymously" 
          ref={imgRef}
          onLoad={handleImageLoad}
        />
        <div className="brandTopSecDetail">
        <h1>{query}</h1>
      <p className="BrandProductFound">
        {data.length} Product{data.length > 1 ? "s" : ""}
      </p>
        </div>
      </div>
      <div className="shop-cards gridLayout searchPageSec">
        {loading ? (
          <CircleLoader />
        ) : Array.isArray(data) && data.length > 0 ? (
          <>
            {data.map((item) => (
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
            ))}
          </>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}

export default BrandPage;
