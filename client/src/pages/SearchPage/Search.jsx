import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../pages/HomePage/home.css";
import "../../pages/ShopPage/shop.css";
import "./search.css";
import _ from "lodash";
import config from "../../config";
import CircleLoader from "../../components/Loaders/CircleLoader";
import SearchBar from "../../components/SearchBar/SearchBar";
import "../../style/CustomCheckBox.css";

function Search() {
  const location = useLocation();
  const [qValue, setQValue] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchCatValue, setSearchCatValue] = useState();
  const [loader, setLoader] = useState(false);
  const [openSidebar, setOpenSideBar] = useState(false);
  const [sideBarBrand, setSideBarBrand] = useState(false);
  const [sideBarCategory, setSideBarCategory] = useState(false);
  const [searchBarRem, setSearchBarRem] = useState(false);
  const query = new URLSearchParams(location.search).get("q");
  const [BrandFilterArr, setBrandFilterArr] = useState([]);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const defaultImage =
    require("../../assets/images/Brand_Logo/amul.png").default;

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
        setCategoryFilter(data.categories);
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
          console.log("setFilterProduct(filtered)", filtered);
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
  
  const OpenSideBar = () => {
    setOpenSideBar(true);
    setSideBarBrand(true);
  };

  function filterSearchBrand(value) {
    setSearchValue(value);

    const filteredBrands = BrandFilterArr.filter((item) => {
      return item.brandName.toLowerCase().includes(value.toLowerCase());
    });

    setBrandFilterArr(filteredBrands);
  }

  function filterSearchCategory(value) {
    setSearchCatValue(value);

    const filterCategory = categoryFilter.filter((item) => {
      return item.toLowerCase().includes(value.toLowerCase());
    });

    setCategoryFilter(filterCategory);
  }

  function handleCheckedBrand(brandName) {
    if (checkedBrand.includes(brandName)) {
      setCheckedBrand(checkedBrand.filter((brand) => brand !== brandName));
    } else {
      setCheckedBrand([...checkedBrand, brandName]);
    }
  }

  function handleCheckedCat(categoryName) {
    if (checkedCategory.includes(categoryName)) {
      setCheckedCategory(checkedCategory.filter((category) => category !== categoryName));
    } else {
      setCheckedCategory([...checkedCategory, categoryName]);
    }
  }

  function handleApplyFilter() {
    const filteredProducts = searchArr.filter((item) => {
      const matchesBrand = checkedBrand.length ? checkedBrand.includes(item.brand) : true;
      const matchesCategory = checkedCategory.length ? checkedCategory.includes(item.category) : true;
      return matchesBrand && matchesCategory;
    });

    setFilterProduct(filteredProducts);
    setOpenSideBar(false);
  }

  function handleRemoveFilter() {
    setCheckedBrand([]);
    setCheckedCategory([]);
    setFilterProduct(searchArr);
    setOpenSideBar(false);
  }

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      setSearchBarRem(true);
    } else {
      setSearchBarRem(false);
    }
  }, [location]);

  return (
    <div className="searchPage">
      {searchBarRem && <SearchBar />}
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
                    <input
                      value={searchValue}
                      type="search"
                      onChange={(event) =>
                        filterSearchBrand(event.target.value)
                      }
                    />
                  </div>
                  <div className="BrandFilterList">
                    {BrandFilterArr.map((item) => (
                      <button
                        key={item.brand}
                        className={`brandBtnFilter ${
                          checkedBrand.includes(item.brandName)
                            ? "ActiveBrandBtnFilter"
                            : ""
                        }`}
                        onClick={() => handleCheckedBrand(item.brandName)}
                      >
                        <div className="firstSec">
                          <div className="Brand_LogooDiv">
                            <img
                              alt={item}
                              src={require(`../../assets/images/Brand_Logo/${item.brandName
                                .toLowerCase()
                                .replace(/ /g, "_")}.png`)}
                              onError={(e) => {
                                e.target.src = defaultImage;
                              }}
                            />
                          </div>
                          <p>
                            {item.brandName}{" "}
                            <span className="countBrandFilter">
                              ({item.TotalBrandPro})
                            </span>
                          </p>
                        </div>
                        <div
                          className={`customCheckBox ${
                            checkedBrand.includes(item.brandName)
                              ? "ActiveCustomCheckBox"
                              : ""
                          }`}
                        >
                          <div
                            className={`transition ${
                              checkedBrand.includes(item.brandName)
                                ? "ActiveChecked"
                                : ""
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {sideBarCategory && (
                <div className="sideBarSection">
                  <h3>Category</h3>
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
                    <input
                      value={searchCatValue}
                      type="search"
                      onChange={(event) =>
                        filterSearchCategory(event.target.value)
                      }
                    />
                  </div>
                  <div className="BrandFilterList">
                    {categoryFilter.map((item) => (
                      <button
                        key={item}
                        className={`brandBtnFilter ${
                          checkedCategory.includes(item)
                            ? "ActiveBrandBtnFilter"
                            : ""
                        }`}
                        onClick={() => handleCheckedCat(item)}
                      >
                        <div className="firstSec">
                          <p>
                            {item
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </p>
                        </div>
                        <div
                          className={`customCheckBox ${
                            checkedCategory.includes(item)
                              ? "ActiveCustomCheckBox"
                              : ""
                          }`}
                        >
                          <div
                            className={`transition ${
                              checkedCategory.includes(item)
                                ? "ActiveChecked"
                                : ""
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="FilActionBtnSec">
            <button onClick={handleRemoveFilter}>Clear Filter</button>
            <button onClick={handleApplyFilter}>Apply</button>
          </div>
        </div>
        <div className="filterBg"></div>
      </div>
      <div className="openFilterSec">
        {filterProduct.length} Products Found
        <button onClick={OpenSideBar} className="openFilterSearch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
          </svg>
          Filter
        </button>
      </div>
      <div className="">
      {
  loader ? (
    <CircleLoader />
  ) : filterProduct.length > 0 ? (
    <div>
      <h4>Top Brands</h4>
      <div className="SearchTopBrandsListHome">
        {BrandFilterArr.slice(0,10).map((item) => (
          <Link to={`/brand?name=${item.brandName}`} className="BrandList">
          <img
            key={item.brandName} // Adding a unique key prop for each image
            alt={item.brandName}
            src={require(`../../assets/images/Brand_Logo/${item.brandName
              .toLowerCase()
              .replace(/ /g, "_")}.png`)}
            onError={(e) => {
              e.target.src = defaultImage; // Fallback image in case of error
            }}
          /></Link>
        ))}
      </div>
      <h4>Top Brands</h4>
      <div className="shop-cards gridLayout searchPageSec">
        {filterProduct.map((item) => (
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
      </div>
    </div>
  ) : (
    <p>No products found.</p>
  )
}

      </div>
    </div>
  );
}

export default Search;
