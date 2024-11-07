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
  const [sideBarBrand, setSideBarBrand] = useState(false);
  const [sideBarCategory, setSideBarCategory] = useState(false);
  const query = new URLSearchParams(location.search).get("q");
  const [BrandFilterArr, setBrandFilterArr] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoader(true);
      try {
        const response = await fetch(`${config.apiUrl}/search?q=${query}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSearchArr(
          Array.isArray(data.filteredProducts) ? data.filteredProducts : []
        );
        setBrandFilterArr(data.brands);
        console.log(" setBrandFilterArr(data.brands);", data.filteredProducts);
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
          setFilterProduct(filtered);
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            </div>
            <div className="ContentSecFilter">
              {sideBarBrand && (
                <div className="sideBarSection">
                  <h3>Brand</h3>
                  <div className="SearchBrandSec">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    {/* <input type="search" onChange={filterSearchBrand}/> */}
                  </div>
                  {BrandFilterArr.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              )}
              {sideBarCategory && (
                <div className="sideBarSection">
                  <h3>Category</h3>
                </div>
              )}
            </div>
          </div>
          <div className="FilActionBtnSec">
            <button >Clear Filter</button>
            <button>Apply</button>
          </div>
        </div>
        <div className="filterBg"></div>
      </div>
      <div className="openFilterSec">
        {filterProduct.length} Products Found
        <button
          onClick={() => setOpenSideBar(true)}
          className="openFilterSearch"
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
            class="lucide lucide-sliders-horizontal"
          >
            <line x1="21" x2="14" y1="4" y2="4" />
            <line x1="10" x2="3" y1="4" y2="4" />
            <line x1="21" x2="12" y1="12" y2="12" />
            <line x1="8" x2="3" y1="12" y2="12" />
            <line x1="21" x2="16" y1="20" y2="20" />
            <line x1="12" x2="3" y1="20" y2="20" />
            <line x1="14" x2="14" y1="2" y2="6" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="16" x2="16" y1="18" y2="22" />
          </svg>{" "}
          Filter
        </button>
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
