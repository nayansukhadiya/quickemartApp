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
import _ from "lodash";

function Search() {
  const [qValue, setQValue] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const { allProductData, loading, error } = useFetchProducts();
  console.log(allProductData);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  const debouncedSearchTerm = useMemo(
    () =>
      _.debounce((term) => {
        if (allProductData) {
          const filtered = allProductData.filter((item) => {
            const titleMatch = item.title
              ?.toLowerCase()
              .includes(term.toLowerCase());
            const categoryMatch = item.catOfPro
              ?.toLowerCase()
              .includes(term.toLowerCase());
            return titleMatch || categoryMatch;
          });
          setFilterProduct(filtered);
        }
      }, 300),
    [allProductData]
  );

  useEffect(() => {
    if (query) {
      setQValue(query); 
    } else if (allProductData) {
      setFilterProduct(allProductData.slice(0, 50)); 
    }
  }, [query, allProductData]);

  useEffect(() => {
    if (qValue) {
      debouncedSearchTerm(qValue);
    } else if (allProductData) {
      setFilterProduct(allProductData.slice(0, 50)); 
    }
    return () => {
      debouncedSearchTerm.cancel(); 
    };
  }, [qValue, debouncedSearchTerm, allProductData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className="searchPage">
        <Logo />
        <SearchBar onSearch={setQValue} value={qValue} />
        <OtherActionBtn />
      </header>
      <div className="shop-cards searchPageSec" style={{ marginTop: "100px" }}>
        {filterProduct.length > 0 ? (
          filterProduct.map((item) => (
            <HomeCard
              key={item.ProIDSearch}
              img={item.image}
              name={item.title}
              mrp={item.mrp}
              price={item.price}
              subTitle={item.subTitle}
              ProIDSearch={item.ProIDSearch}
              category={item.category}
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
