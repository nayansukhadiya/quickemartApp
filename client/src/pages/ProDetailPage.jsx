import React, { useEffect, useState, useRef } from "react";
import "../style/productDetail.css";
import { Link, useLocation } from "react-router-dom";
import AddCartBtn from "../components/AddCartBtn";
import { FastAverageColor } from "fast-average-color";

function ProDetailPage() {
  const fac = new FastAverageColor();
  const imgRef = useRef(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");
  const [averageColor, setAverageColor] = useState(""); // State for average color
  const [detailArr, setDetailArr] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);

  const searchQuery = query.split("-");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  const p_id = query;

  useEffect(() => {
    if (p_id) {
      fetch(`http://localhost:5000/detail?p_id=${p_id}`)
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
            const updatedImages = data.images.map((img) => replaceImageDimensions(img));
            setImages(updatedImages);
            setMainImage(updatedImages[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [p_id]);

  const replaceImageDimensions = (url) => {
    return url.replace(/h_\d+/, 'h_1080').replace(/w_\d+/, 'w_1080');
  };

  const handleImageLoad = () => {
    const imgElement = imgRef.current;

    if (imgElement) {
      fac.getColorAsync(imgElement)
        .then((color) => {
          const rgbaWithAlpha = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.2)`;
          setAverageColor(rgbaWithAlpha); // Set RGBA with modified alpha
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const product = detailArr[0];

  return (
    <>
      <div className="detailMain">
        <div className="img-section part-section">
          <div
            className="mainImg"
            style={{
              backgroundColor: averageColor || "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            <img
              crossOrigin="anonymously" // Fixed the spelling here
              ref={imgRef}
              src={product?.img ? replaceImageDimensions(product.img) : "path/to/default-image.jpg"}
              alt="Main product"
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        <div className="detail-section-product part-section">
          <div className="ProductPageDir">
            <Link to="/">Home</Link> <p> / </p>
            <Link to={`/shop?id=${searchQuery[1]}`}>{searchQuery[1]}</Link>{" "}
            <p> / </p>
            <p>{product ? product.name : "Loading..."}</p>
          </div>
          <h3 className="ProTitle">{product ? product.name : "Loading..."}</h3>
          <h5>{product ? product.unit : "Loading..."}</h5>
          <div className="directLink">
            <Link to={`/search?q=${searchQuery[1]}`}>{searchQuery[1]}</Link>
            <Link to={`/search?q=${product ? product.brand : ""}`}>
              {product ? product.brand : "Loading..."}
            </Link>
          </div>
          <Link className="allBrandPro" to={`/search?q=${product ? product.brand : ""}`}>
            View all {product ? product.brand : "Loading..."} Products
          </Link>
          <h3 className="ProTitle">
            &#8377; {product ? product.price : "Loading..."}{" "}
            <span>{product ? product.mrp : "Loading..."}</span>
          </h3>

          {product && (
            <AddCartBtn
              key={p_id}
              ProIDSearch={p_id}
              img={product.img} // Extracted from product
              name={product.name} // Extracted from product
              price={product.price} // Extracted from product
              mrp={product.mrp} // Extracted from product
              unit={product.unit} // Extracted from product
              category={product.category} // Extracted from product
              discount={product.discount} // Extracted from product
            />
          )}
          
          <div className="highlight">
            {product?.highlights?.length > 0 && (
              <>
                <h6>Highlight</h6>
                <ul className="productHighlight">
                  {product.highlights.map((item, index) => (
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
              <p>{product ? product.name : "Loading..."}</p>
            </div>

            <div>
              <h5>Brand</h5>
              <p>{product ? product.brand : "Loading..."}</p>
            </div>
            <div>
              <h5>Category</h5>
              <p>{searchQuery[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProDetailPage;
