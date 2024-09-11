import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../style/searchPage.css";
import Logo from "../components/Logo";
import OtherActionBtn from "../components/OtherActionBtn";
import HomeCard from "../components/HomeCard";
import "../style/home.css";
import "../style/shop.css";
import useFetchProducts from "../hooks/useFetchProducts";
import _ from 'lodash';

function Search() {
  const [qValue, setQValue] = useState(''); // State for the query value
  const [filterProduct, setFilterProduct] = useState([]); // State for filtered products
  const { allProductData, loading, error } = useFetchProducts(); // Fetch products
  const location = useLocation(); // Access the location object

  // Extract the query from the URL
  const query = new URLSearchParams(location.search).get("q");

  // Debounced search function to limit how often we filter the products
  const debouncedSearchTerm = useMemo(
    () => _.debounce((term) => {
      if (allProductData) {
        const filtered = allProductData.filter((item) => {
          const titleMatch = item.title?.toLowerCase().includes(term.toLowerCase());
          const categoryMatch = item.category?.toLowerCase().includes(term.toLowerCase());
          return titleMatch || categoryMatch; // Matches if either title or category includes the term
        });
        setFilterProduct(filtered);
      }
    }, 300),
    [allProductData]
  );
  

  // Show top 50 products or filtered products if there's a search query
  useEffect(() => {
    if (query) {
      setQValue(query); // Set the search term from the URL query parameter
    } else if (allProductData) {
      setFilterProduct(allProductData.slice(0, 50)); // Show top 50 products if no query
    }
  }, [query, allProductData]);

  // Trigger the debounced search whenever the search value changes
  useEffect(() => {
    if (qValue) {
      debouncedSearchTerm(qValue);
    } else if (allProductData) {
      setFilterProduct(allProductData.slice(0, 50)); // Reset to top 50 products if search is cleared
    }
    return () => {
      debouncedSearchTerm.cancel(); // Cleanup debounce on unmount
    };
  }, [qValue, debouncedSearchTerm, allProductData]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className="searchPage">
        <Logo />
        <SearchBar onSearch={setQValue} value={qValue} /> {/* Pass qValue to SearchBar */}
        <OtherActionBtn />
      </header>
      <div className="shop-cards" style={{ marginTop: "100px" }}>
        {filterProduct.length > 0 ? (
          filterProduct.map((item) => (
            <HomeCard
              key={item.id}
              img={item.images[0]}
              name={item.title}
              mrp={item.mrp}
              price={item.price}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}

export default Search;
