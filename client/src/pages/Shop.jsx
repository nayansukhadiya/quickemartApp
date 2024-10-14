import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import "../style/home.css";
import "../style/shop.css";
import ShopSideNav from "../components/ShopSideNav";
import config from "../config";
import ProductNav from "../components/ProductNav";
function Shop() {
  const [categoryArr, setCategoryArr] = useState([]);
  const [urlId, setUrlId] = useState({ catId: null, subId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(28);
  const [catData, setCatData] = useState(null);
  const [sortOrder, setSortOrder] = useState("Relative");
  const [filterBrand, setFilterBrand] = useState([]);
  const [sidebarBrand, setSidebarBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get("catid");
    const subId = queryParams.get("subid");

    setUrlId({ catId, subId });
    setCurrentPage(1);
  }, [location.search]);

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
    let brandArr = [];
    for (const element of categoryArr) {
      brandArr.push(element.brand);
    }
    const uniqueArray = [...new Set(brandArr)];
    setFilterBrand(uniqueArray);
  }, [categoryArr]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryArr.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(categoryArr.length / productsPerPage);

  return (
    <>
      <ProductNav />
      <div>
        <div className="upperSecShop">
          <h5>{categoryArr.length} Product(s) Found</h5>
          <div className="dropdown">
            <button className="dropbtn">Sort by Price</button>
            <div className="dropdown-content">
              <button onClick={() => setSortOrder("Relative")}>Relative</button>
              <button onClick={() => setSortOrder("asc")}>Low to High</button>
              <button onClick={() => setSortOrder("desc")}>High to Low</button>
            </div>
          </div>
          <button onClick={() => setSidebarBrand(true)}>Open</button>
        </div>
      </div>
      <div className="shopPage">
      <div className={`brandFilterSec ${sidebarBrand ? "ActiveSideBar" : ""}`}>
          <div className="bgFilter"></div>
          <div className="brandFilterDiv">
          <button onClick={() => setSidebarBrand(false)}>Close</button>

          {filterBrand.map((item) => (
                <button key={item}>{item}</button>
              ))}
          </div>
        </div>
        <ShopSideNav catArr={catData} ActiveBtn={urlId.subId} />
        <div className="shopMain">
          <div className="shop-cards">
            {currentProducts.map((item) => (
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
    </>
  );
}

export default Shop;
