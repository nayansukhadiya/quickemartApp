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
  const location = useLocation();
  const [searchArr, setSearchArr] = useState([]);

  useEffect(() => {
    if (allProductData) {
      setSearchArr(allProductData);
    }
  }, [allProductData]);

  const query = new URLSearchParams(location.search).get("q");

  const debouncedSearchTerm = useMemo(
    () =>
      _.debounce((term) => {
        if (searchArr.length > 0) {
          const filtered = searchArr.filter((item) => {
            const titleMatch = item.title
              ?.toLowerCase()
              .includes(term.toLowerCase());
            const categoryMatch = item.catOfPro
              ?.toLowerCase()
              .includes(term.toLowerCase());
            const brandMatch = item.brand
              ?.toLowerCase()
              .includes(term.toLowerCase());
            return titleMatch || categoryMatch || brandMatch;
          });
          setFilterProduct(filtered);
        }
      }, 300),
    [searchArr]
  );

  useEffect(() => {
    if (query) {
      setQValue(query);
    } else if (searchArr.length > 0) {
      setFilterProduct(searchArr.slice(0, 50));
    }
  }, [query, searchArr]);

  useEffect(() => {
    if (qValue) {
      debouncedSearchTerm(qValue);
    } else if (searchArr.length > 0) {
      setFilterProduct(searchArr.slice(0, 50));
    }
    return () => {
      debouncedSearchTerm.cancel();
    };
  }, [qValue, debouncedSearchTerm, searchArr]);

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
