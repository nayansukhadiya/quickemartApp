import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../pages/HomePage/home.css";
import "../../pages/ShopPage/shop.css";
import "./search.css";
import _ from "lodash";
import config from "../../config";
import CircleLoader from "../../components/Loaders/CircleLoader";

function Search() {
  const location = useLocation();
  const [qValue, setQValue] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [sideBarPrice, setSideBarPrice] = useState(true);
  const [sideBarBrand, setSideBarBrand] = useState(false);
  const [sideBarCategory, setSideBarCategory] = useState(false);
  const query = new URLSearchParams(location.search).get("q");
  const [BrandFilterArr, setBrandFilterArr] = useState([]);
  const [range, setRange] = useState({ min: null, max: null });

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `${config.apiUrl}/products/search?q=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSearchArr(
          Array.isArray(data.filteredProducts) ? data.filteredProducts : []
        );
        setRange({ min: data.price.MinPrice, max: data.price.MaxPrice });
        setBrandFilterArr(data.brands);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      } finally {
        setLoader(false);
      }
    };
    if (query) fetchFilteredProducts();
  }, [query]);

  const debouncedSearchTerm = useMemo(
    () =>
      _.debounce((term) => {
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
          setFilterProduct(filtered.slice(0, 50));
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
  }, [query, debouncedSearchTerm, searchArr]);

 
  const AppearSubSideSec = (section) => {
    setSideBarBrand(false);
    setSideBarCategory(false);

    switch (section) {
      case "brand":
        setSideBarBrand(true);
        break;
      case "category":
        setSideBarCategory(true);
        break;
      default:
        setSideBarBrand(true);
    }
  };

  return (
    <div className="searchPage">
      <div className={`FilterSec ${openSidebar ? "visible" : ""}`}>
        <div className="filterSecDiv">
          <div className="HeaderSidebar">
            <button
              className="closeSideBar"
              onClick={() => setOpenSideBar(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
          <div className="BottomSec">
            <div className="titleSec">
              <button
                className={sideBarBrand ? "ActiveBtnFilter" : ""}
                onClick={() => AppearSubSideSec("brand")}
              >
                Brand
              </button>
              <button
                className={sideBarCategory ? "ActiveBtnFilter" : ""}
                onClick={() => AppearSubSideSec("category")}
              >
                Category
              </button>
              <button
                className={sideBarPrice ? "ActiveBtnFilter" : ""}
                onClick={() => AppearSubSideSec("price")}
              >
                Price
              </button>
            </div>
            <div className="ContentSecFilter">
              {sideBarBrand && (
                <div className="sideBarSection">
                  <h3>Brand</h3>
                  <div className="SearchBrandSec">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    {/* <input type="search" onChange={filterSearchBrand}/> */}
                  </div>
                  {BrandFilterArr.map((item) => (
                    <p>{item}</p>
                  ))}
                </div>
              )}
              {sideBarCategory && (
                <div className="sideBarSection">
                  <h3>Category</h3>
                </div>
              )}
              {sideBarPrice && (
                <div className="sideBarSection">
                  <h3>Price Range</h3>
                  <p>
                    Range is the {range.min} - {range.max}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="FilActionBtnSec">
            {/* <button onClick={clearFilters}>Clear Filter</button> */}
            <button>Apply</button>
          </div>
        </div>
        <div className="filterBg"></div>
      </div>
      <div className="openFilterSec">
        <button onClick={() => setOpenSideBar(true)}>open</button>
      </div>
      <div className="shop-cards gridLayout searchPageSec">
        {loader ? (
          <CircleLoader />
        ) : filterProduct.length > 0 ? (
          filterProduct.map((item) => (
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
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
