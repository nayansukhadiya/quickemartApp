import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "../../pages/HomePage/home.css";
import "./shop.css";
import ShopSideNav from "./ShopSideNav";
import config from "../../config";
import ProductNav from "../../components/Navbar/ProductNav";
import Loader from "../../components/Loaders/Loader";
import SkeletonSec from "../../pages/ShopPage/SkeletonSec";

function Shop() {
  const [categoryArr, setCategoryArr] = useState([]);
  const [urlId, setUrlId] = useState({ catId: null, subId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(28);
  const [catData, setCatData] = useState(null);
  const [sortOrder, setSortOrder] = useState("Relative");
  const [allBrand, setAllBrand] = useState([]);
  const [filterBrand, setFilterBrand] = useState([]);
  const [sidebarBrand, setSidebarBrand] = useState(false);
  const [checkedBrand, setCheckedBrand] = useState([]);
  const [loaderTime, setLoaderTime] = useState(true);
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [currentProducts, setCurrentProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get("catid");
    const subId = queryParams.get("subid");

    setUrlId({ catId, subId });
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    setSkeletonLoader(true);
    window.scrollTo(0, 0);
    setCheckedBrand([]);
  }, [urlId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      if (urlId.catId) {
        try {
          const response = await fetch(
            `${config.apiUrl}/categories?cat_name=${urlId.catId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCatData(data);
          console.log("categories data is", data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };
    fetchData();
  }, [urlId.catId, sortOrder]);

  useEffect(() => {
    if (!catData) return;

    const fetchData = async () => {
      let subName = urlId.subId ? urlId.subId : catData[0].subcategories[0];

      try {
        const response = await fetch(
          `${config.apiUrl}/products?sub_category=${subName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (sortOrder === "Relative") {
          setCategoryArr(data);
          setFilterBrand(data);
          setLoaderTime(false);
        } else {
          sortArr(data, sortOrder);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [catData, urlId.subId, sortOrder]);

  const sortArr = (data, order) => {
    let sortedArr = [...data];
    if (order === "asc") {
      sortedArr = sortedArr.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedArr = sortedArr.sort((a, b) => b.price - a.price);
    }
    setCategoryArr(sortedArr);
    setCurrentPage(1);
  };

  useEffect(() => {
    let brandCount = {};

    for (const element of filterBrand) {
      const brand = element.brand;
      if (brandCount[brand]) {
        brandCount[brand] += 1;
      } else {
        brandCount[brand] = 1;
      }
    }

    const uniqueArrayWithCount = Object.entries(brandCount)
      .map(([brand, count]) => ({
        brand,
        count,
      }))
      .sort((a, b) => a.brand.localeCompare(b.brand));
    setAllBrand(uniqueArrayWithCount);
    console.log(uniqueArrayWithCount)
  }, [categoryArr,filterBrand]);

  function handleCheckedBrand(item) {
    if (checkedBrand.includes(item)) {
      setCheckedBrand(checkedBrand.filter((brand) => brand !== item));
    } else {
      setCheckedBrand([...checkedBrand, item]);
    }
  }

  function handleApplyFilter() {
    setSkeletonLoader(true);
    const filteredProducts1 = filterBrand.filter((item) =>
      checkedBrand.length ? checkedBrand.includes(item.brand) : true
    );
    setSidebarBrand(false);
    setCurrentPage(1);
    setTimeout(() => {
      setSkeletonLoader(false);
    }, 1000);
    setCategoryArr(filteredProducts1);
  }
  function handleRemoveFilter() {
    setSkeletonLoader(true);
    setCheckedBrand([]);
    setTimeout(() => {
      setSkeletonLoader(false);
    }, 1000);
    setCategoryArr(filterBrand);
  }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  useEffect(() => {
    setCurrentProducts([]);
    setSkeletonLoader(true);
    const currentProducts1 = categoryArr.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProducts(currentProducts1);
    setSkeletonLoader(false);
  }, [categoryArr, indexOfFirstProduct, indexOfLastProduct]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(categoryArr.length / productsPerPage);
  const defaultImage = require("../../assets/images/Brand_Logo/amul.png").default;
  return (
    <div className="ShopMainPage">
      <ProductNav />
      <div>
        <div className={`${loaderTime ? "loaderSec" : "LoaderNone"}`}>
          <Loader />
        </div>
        <div className="upperSecShop">
          <h5>{categoryArr.length} Product Found</h5>
          <div>
            <div className="dropdown">
              <button className="dropbtn">Sort by Price</button>
              <div className="dropdown-content">
                <button onClick={() => setSortOrder("Relative")}>
                  Relative
                </button>
                <button onClick={() => setSortOrder("asc")}>Low to High</button>
                <button onClick={() => setSortOrder("desc")}>
                  High to Low
                </button>
              </div>
            </div>
            <button className="dropbtn" onClick={() => setSidebarBrand(true)}>
              Brand
            </button>
          </div>
        </div>
      </div>
      <div className="shopPage">
        <div
          className={`bgFilter ${sidebarBrand ? "ActiveBgFilter" : ""}`}
        ></div>
        <div
          className={`brandFilterSec ${sidebarBrand ? "ActiveSideBar" : ""}`}
        >
          <div className="brandFilterDiv">
            <div className="upperSecDiv">
              Filter
              <button
                className="closeSideBar"
                onClick={() => setSidebarBrand(false)}
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="brandList">
              {allBrand.map((item) => (
                <button
                  key={item.brand}
                  className={`brandBtnFilter ${
                    checkedBrand.includes(item.brand)
                      ? "ActiveBrandBtnFilter"
                      : ""
                  }`}
                  onClick={() => handleCheckedBrand(item.brand)}
                >
                  <div className="firstSec">
                    <div className="Brand_LogooDiv">
                      <img
                        alt={item.brand}
                        src={
                          require(`../../assets/images/Brand_Logo/${item.brand
                            .toLowerCase()
                            .replace(/ /g, "_")}.png`) || defaultImage
                        }
                        onError={(e) => {
                          e.target.src = defaultImage;
                        }}
                      />
                    </div>
                    <p>
                      {item.brand}{" "}
                      <span className="countBrandFilter">({item.count})</span>
                    </p>{" "}
                  </div>
                  <div
                    className={`customCheckBox ${
                      checkedBrand.includes(item.brand)
                        ? "ActiveCustomCheckBox"
                        : ""
                    }`}
                  >
                    <div
                      className={`transition ${
                        checkedBrand.includes(item.brand) ? "ActiveChecked" : ""
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
            <div className="filterApplyDiv">
              <button className="clearBtn" onClick={handleRemoveFilter}>
                Clear Filter
              </button>
              <button className="filterBtn" onClick={handleApplyFilter}>
                Apply
              </button>
            </div>
          </div>
        </div>
        <ShopSideNav catArr={catData} ActiveBtn={urlId.subId} />
        <div className="shopMain">
          <div
            className={`gridLayout  ${
              skeletonLoader ? "skeletonLoaderSec" : "LoaderNone"
            }`}
          >
            <SkeletonSec />
          </div>
          <div
            className={`shop-cards gridLayout  ${
              skeletonLoader ? "skeletonLoaderSecActiveDis" : ""
            }`}
          >
            {currentProducts.map((item) => (
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
          <div className={totalPages === 1 ? "DisablePaginate" : "pagination"}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={number === currentPage ? "active" : ""}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
