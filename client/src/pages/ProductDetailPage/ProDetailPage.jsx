import React, { useEffect, useState, useRef } from "react";
import "./productDetail.css";
import { Link, useLocation } from "react-router-dom";
import AddCartBtn from "../../components/AddCartBtn";
import { FastAverageColor } from "fast-average-color";
import config from "../../config";
import RelatedBrand from "../../pages/ProductDetailPage/RelatedBrand";
import DetailPageRelated from "../../pages/ProductDetailPage/DetailPageRelated";
import CircleLoader from "../../components/Loaders/CircleLoader";

function ProductDetailPagePage() {
  const fac = new FastAverageColor();
  const imgRef = useRef(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");
  const [averageColor, setAverageColor] = useState("");
  const [detailArr, setDetailArr] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const searchQuery = query ? query.split("-") : [];
  if (searchQuery.length !== 2) {
    console.error("Invalid query format");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true); // Set loading to true when query changes
  }, [query]);

  const p_id = query;

  useEffect(() => {
    if (p_id) {
      fetch(`${config.apiUrl}/detail?p_id=${p_id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched product:", data);
          setDetailArr([data]);
          if (data.images && data.images.length > 0) {
            if (imgRef.current) {
              imgRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Ensure loading is set to false on error
        });
    }
  }, [p_id]);

  const replaceImageDimensions = (url) => {
    return url.replace(/h_\d+/, "h_1080").replace(/w_\d+/, "w_1080");
  };

  const handleImageLoad = () => {
    const imgElement = imgRef.current;
    if (imgElement) {
      fac
        .getColorAsync(imgElement)
        .then((color) => {
          const rgbaWithAlpha = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.23)`;
          setAverageColor(rgbaWithAlpha);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };


  const renderIfExists = (value, fallback = "Loading...") => {
    return value ? value : fallback;
  };

  const product = detailArr[0];

  if (loading) { 
    return <CircleLoader />;
  }

  return (
    <>
      <div className="ProductDetailPageNav">
        <Link to="/category">
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
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>
        <p>{renderIfExists(product.name)}</p>
        <Link to="/search">
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
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </Link>
      </div>
      <div className="detailMain">
        <div className="img-section part-section">
          <div
            className="mainImg lightGrayBorder"
            style={{
              backgroundColor: averageColor || "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            <img
              crossOrigin="anonymously" 
              ref={imgRef}
              src={
                product?.img
                  ? replaceImageDimensions(product.img)
                  : "path/to/default-image.jpg"
              }
              alt="Main product"
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        <div className="detail-section-product part-section mainPart">
          <div className="bgDetailDifferent shadowDeep lightGrayBorder firstSecDetail">
            <div className="ProductPageDir">
              <Link to="/">Home</Link> <p> / </p>
              <Link
                to={`/shop?catid=${product.category}&subid=${product.sub_category}`}
              >
                {renderIfExists(
                  product.sub_category
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                )}
              </Link>{" "}
              <p> / </p>
              <p>{renderIfExists(product.name)}</p>
            </div>
            <h3 className="ProTitle">{renderIfExists(product.name)}</h3>
            <h5>{renderIfExists(product.unit)}</h5>
            <h3 className="ProTitle">
              &#8377; {renderIfExists(product.price)}{" "}
              {product.mrp && <span>{product.mrp}</span>}
            </h3>
          </div>
          <div className="bgDetailDifferent shadowDeep lightGrayBorder">
            <Link
              className="allBrandPro"
              to={`/brand?name=${renderIfExists(product.brand)}`}
            >
              <img
                src={require(`../../assets/images/Brand_Logo/${product.brand
                  .toLowerCase()
                  .replace(/ /g, "_")}.png`)}
                alt={product.brand}
              />{" "}
              <div className="nameSecBrand">
                <div className="sec1">
                  <p className="brandName">{product.brand}</p>
                  <h5>Explore all Products</h5>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          <div className="bgDetailDifferent shadowDeep lightGrayBorder">
            <div className="productDetailIconSec">
              <div className="productDetailIcon">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="black"
                    >
                      <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
                      <path d="M14.5 17.5h-5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5m.5-9h1.801c.83 0 1.245 0 1.589.195c.344.194.557.55.984 1.262l1.699 2.83c.212.354.318.532.373.728c.054.197.054.403.054.816V15c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201M2 13v2c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4" />
                    </g>
                  </svg>
                </div>
                <p>Fast</p>
                <h6>Delivery</h6>
              </div>
              <div className="productDetailIcon">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      color="black"
                    >
                      <path d="M17 10.805c0-.346 0-.519.052-.673c.151-.448.55-.621.95-.803c.448-.205.672-.307.895-.325c.252-.02.505.034.721.155c.286.16.486.466.69.714c.943 1.146 1.415 1.719 1.587 2.35c.14.51.14 1.044 0 1.553c-.251.922-1.046 1.694-1.635 2.41c-.301.365-.452.548-.642.655a1.27 1.27 0 0 1-.721.155c-.223-.018-.447-.12-.896-.325c-.4-.182-.798-.355-.949-.803c-.052-.154-.052-.327-.052-.673zm-10 0c0-.436-.012-.827-.364-1.133c-.128-.111-.298-.188-.637-.343c-.449-.204-.673-.307-.896-.325c-.667-.054-1.026.402-1.41.87c-.944 1.145-1.416 1.718-1.589 2.35a2.94 2.94 0 0 0 0 1.553c.252.921 1.048 1.694 1.636 2.409c.371.45.726.861 1.363.81c.223-.018.447-.12.896-.325c.34-.154.509-.232.637-.343c.352-.306.364-.697.364-1.132z" />
                      <path d="M5 9c0-3.314 3.134-6 7-6s7 2.686 7 6m0 8v.8c0 1.767-1.79 3.2-4 3.2h-2" />
                    </g>
                  </svg>
                </div>
                <p>24/7</p>
                <h6>Support</h6>
              </div>
            </div>
          </div>

          <div className="AddCartSec">
            <div className="cartProductDetailPage">
              <h5>{renderIfExists(product.unit)}</h5>
              <p>
                MRP <span>&#8377; {renderIfExists(product.price)}</span>
              </p>
              <h6>Inclusive of all taxes</h6>
            </div>
            <div className="cartBtn">
              {product && (
                <AddCartBtn
                  key={p_id}
                  ProIDSearch={p_id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  mrp={product.mrp}
                  unit={product.unit}
                  category={product.category}
                  discount={product.discount}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mainPart relatedPart">
        <div className="">
          <RelatedBrand category={product.sub_category} brandName={product.brand} />
        </div>
        <div className="">
          <DetailPageRelated related_search_value={`similar?proId=${product.p_id}&subCategory=${product.sub_category}`} valueLink={`${product.sub_category}`} name={`similar product`} />
        </div>
        <div className="">
          <DetailPageRelated related_search_value={`brandSimilar?proId=${product.p_id}&brand=${product.brand}`} valueLink={`${product.brand}`} name={`More product from ${product.brand}`} />
        </div>
      </div>
    </>
  );
}

export default ProductDetailPagePage;
