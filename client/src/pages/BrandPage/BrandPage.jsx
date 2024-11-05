import React, { useEffect, useState } from "react";
import config from "../../config";
import { Link, useLocation } from "react-router-dom";
import CircleLoader from "../../components/Loaders/CircleLoader";
import ProductCard from "../../components/ProductCard";
import BackBtn from "../../components/BackBtn/BackBtn";

function BrandPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("name");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("brand name is the ", query);
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/brand?name=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
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

  return (
    <>
      <BackBtn
        LinkName={query
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      />
          <p className="BrandProductFound">{data.length} Product{data.length > 1 ? 's' : ''} Found</p>
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
