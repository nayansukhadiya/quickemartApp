import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import "../style/home.css";
import "../style/shop.css";
import _ from "lodash";
import config from "../config";

function Search() {
  const location = useLocation();
  const [qValue, setQValue] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/products/search?q=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Ensure data is an array
        setSearchArr(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };
    if (query) fetchFilteredProducts();
  }, [query]);

  const debouncedSearchTerm = useMemo(
    () => _.debounce((term) => {
      if (searchArr.length > 0) {
        const lowerTerm = term.toLowerCase();
        const filtered = searchArr.filter((item) => {
          return (
            item.title2?.toLowerCase().includes(lowerTerm) ||
            item.category?.toLowerCase().includes(lowerTerm) ||
            item.sub_category?.toLowerCase().includes(lowerTerm) ||
            item.brand?.toLowerCase().includes(lowerTerm)
          );
        });
        setFilterProduct(filtered.slice(0, 50)); // Limiting to first 50 results
      }
    }, 300),
    [searchArr]
  );

  useEffect(() => {
    if (query) {
      setQValue(query);
      debouncedSearchTerm(query);
    } else {
      setFilterProduct(searchArr.slice(0, 50));
    }
    return () => {
      debouncedSearchTerm.cancel();
    };
  }, [query, debouncedSearchTerm]);

  return (
    <div className="shop-cards gridLayout searchPageSec">
      {filterProduct.length > 0 ? (
        filterProduct.map((item) => (
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
        <p>No products found for "{qValue}".</p>
      )}
    </div>
  );
}

export default Search;
