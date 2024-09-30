import React, { useEffect, useState } from "react";
import "../style/productDetail.css";
import { Link, useLocation } from "react-router-dom";
import AddCartBtn from "../components/AddCartBtn";
import HomeCard from "../components/HomeCard";

function ProDetailPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");

  const [detailArr, setDetailArr] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [relatedPro, setRelatedPro] = useState([]);

  const searchQuery = query.split("-");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    fetch(`json/${searchQuery[1]}.json`)
      .then((res) => res.json())
      .then((data) => {
        const filterPro = data.filter((item) => item.ProIDSearch === query);
        setDetailArr(filterPro);
        console.log(query);
        console.log(filterPro);
        const totalProducts = data.length;
        const currentIndex = parseInt(1, 10);

        let relatedArrPrev = [];
        if (currentIndex === 0) {
          relatedArrPrev = data.slice(-10).reverse();
        } else if (currentIndex - 10 < 0) {
          const startPrev = data.slice(0, currentIndex).reverse();
          const wrapPrev = data
            .slice(totalProducts - (10 - currentIndex))
            .reverse();
          relatedArrPrev = [...wrapPrev, ...startPrev];
        } else {
          relatedArrPrev = data
            .slice(currentIndex - 10, currentIndex)
            .reverse();
        }

        let relatedArrNext = [];
        if (currentIndex === totalProducts - 1) {
          relatedArrNext = data.slice(0, 9);
        } else if (currentIndex + 9 > totalProducts) {
          const endNext = data.slice(currentIndex + 1, totalProducts);
          const wrapNext = data.slice(0, 9 - endNext.length);
          relatedArrNext = [...endNext, ...wrapNext];
        } else {
          relatedArrNext = data.slice(currentIndex + 1, currentIndex + 9);
        }

        const relatedArr = [...relatedArrPrev, ...relatedArrNext];
        setRelatedPro(relatedArr);
        console.log(relatedArr);

        if (filterPro.length > 0) {
          const productImages = filterPro[0].images || [];
          setImages(productImages);
          setMainImage(productImages.length > 0 ? productImages[0] : mainImage);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [query]);

  const percentageDifference = (num1, num2) => {
    if (!num1 || !num2 || num1 === num2) {
      return null; // No discount or invalid data
    }
    let percentageDiff = ((num2 - num1) / num2) * 100;
    return percentageDiff >= 5 ? Math.floor(percentageDiff) : null; // Show only if discount is at least 5%
  };

  return (
    <>
      <div className="detailMain">
        <div className="img-section part-section">
          <div className="mainImg">
            <img src={mainImage} alt="Main product" />
          </div>
        </div>

        <div className="detail-section-product part-section">
          <div className="ProductPageDir">
            <Link to="/">Home</Link> <p> / </p>
            <Link to={`/shop?id=${searchQuery[1]}`}>{searchQuery[1]}</Link>{" "}
            <p> / </p>
            <p>{detailArr.length > 0 && detailArr[0].title}</p>
          </div>
          <h3 className="ProTitle">
            {detailArr.length > 0 && detailArr[0].title}
          </h3>
          <h5>{detailArr.length > 0 && detailArr[0].subTitle}</h5>
          <div className="directLink">
            <Link  to={`/search?q=${searchQuery[1]}`}>{searchQuery[1]}</Link>
            <Link  to={`/search?q=${detailArr.length > 0 && detailArr[0].brand}`}>{detailArr.length > 0 && detailArr[0].brand}</Link>
          </div>
          <Link
            className="allBrandPro"
            to={`/search?q=${detailArr.length > 0 && detailArr[0].brand}`}
          >
            View all {detailArr.length > 0 && detailArr[0].brand} Products
          </Link>
          <h3 className="ProTitle">
            &#8377; {detailArr.length > 0 && detailArr[0].price}{" "}
            <span>{detailArr.length > 0 && detailArr[0].mrp}</span>
          </h3>

          {percentageDifference(
            detailArr.length > 0 && detailArr[0].price,
            detailArr.length > 0 && detailArr[0].mrp
          ) && (
            <p className="detailDis">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
              {percentageDifference(
                detailArr.length > 0 && detailArr[0].price,
                detailArr.length > 0 && detailArr[0].mrp
              )}
              % OFF
            </p>
          )}
          <AddCartBtn
            ProIDSearch={query}
            img={images[0]}
            name={detailArr.length > 0 && detailArr[0].title}
            price={detailArr.length > 0 && detailArr[0].price}
            mrp={detailArr.length > 0 && detailArr[0].mrp}
            subTitle={detailArr.length > 0 && detailArr[0].subTitle}
            category={detailArr.length > 0 && detailArr[0].category}
          />
          <div className="highlight">
            {detailArr.length > 0 &&
              detailArr[0].highlights &&
              detailArr[0].highlights.length > 0 && (
                <>
                  <h6>Highlight</h6>
                  <ul className="productHighlight">
                    {detailArr[0].highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
          </div>
          <div className="ProductMoreDetail">
            <h6>
              <b>Product Detail</b>
            </h6>
            <div>
              <h5>Name</h5>
              <p>{detailArr.length > 0 && detailArr[0].title}</p>
            </div>

            <div>
              <h5>Brand</h5>
              <p>{detailArr.length > 0 && detailArr[0].brand}</p>
            </div>
            <div>
              <h5>Category</h5>
              <p>{searchQuery[1]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relativeSec">
        <h3 className="relatedTitle">Related Products</h3>
        <div className="relatedPro">
          {relatedPro.length > 0 ? (
            relatedPro.map((item) => (
              <HomeCard
                key={item.id}
                img={item.images[0] || "fallback_image_url"} // Add fallback image
                name={item.title}
                mrp={item.mrp}
                price={item.price}
                subTitle={item.subTitle}
                ProIDSearch={item.ProIDSearch}
                category={item.category}
              />
            ))
          ) : (
            <p>No related products found.</p> // Message for empty state
          )}
        </div>
        <Link to={`/shop?id=${searchQuery[1]}`} className="showRelatedMore">
          All Related Products
        </Link>
      </div>
    </>
  );
}

export default ProDetailPage;
