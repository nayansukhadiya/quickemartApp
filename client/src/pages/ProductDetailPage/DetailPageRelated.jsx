import React, { useEffect, useState } from "react";
import config from "../../config";
import CartGenCard from "../../pages/CartGeneratorPage/CartGenCard";
import "./detailPageRelated.css";
import { Link } from "react-router-dom";

function DetailPageRelated({ related_search_value, name }) {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(
      "api is the ",
      `${config.apiUrl}/related/${related_search_value}`
    );
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/related/${related_search_value}`
        ); // Use related_search_value directly
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log({ name }, data);
        setBrand(data); // Set the fetched data into the brand state
      } catch (error) {
        console.error("Error fetching brands:", error);
        setError(error.message); // Set error message for display
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchBrands();
  }, [related_search_value, name]); // Re-fetch if related_search_value changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="detailPageRelatedComponent">
      <h2>{name}</h2>
      {brand.length === 0 ? (
        <p>No related brands found.</p>
      ) : (
        <div className="detailPageRelatedSec">
          {brand.slice(0, 12).map((item) => (
            <CartGenCard
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
          <Link className="similarPro">
            More product
            <div className="similarImgSec">
              {brand.slice(12, 15).map((item, index) => (
                <div className={`imgSec imgIndex${index + 1}`}>
                  <img src={item.img} />
                </div>
              ))}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-step-forward"><line x1="6" x2="6" y1="4" y2="20"/><polygon points="10,4 20,12 10,20"/></svg>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DetailPageRelated;
