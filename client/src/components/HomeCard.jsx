import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AddCartBtn from "./AddCartBtn";
import { FastAverageColor } from "fast-average-color";

function HomeCard({ img, name, mrp, price, ProIDSearch, category, discount,unit }) {
  const [averageColor, setAverageColor] = useState(null);
  const imgRef = useRef(null);

  // Ensure the average color is calculated only after the image has fully loaded
  const handleImageLoad = () => {
    const fac = new FastAverageColor();
    const imgElement = imgRef.current;

    if (imgElement) {
      fac
        .getColorAsync(imgElement)
        .then((color) => {
          // Modify the alpha value to 0.2
          const rgbaWithAlpha = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.2)`;
          setAverageColor(rgbaWithAlpha); // Set RGBA with modified alpha
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  if (price === null || price === undefined) {
    return null;
  }

  return (
    <div className="card">
      <Link title={name} to={`/detail?id=${ProIDSearch}`}>
        <div
          className="img-section"
          style={{
            backgroundColor: averageColor || "transparent", // Apply the average color if available
            transition: "background-color 0.3s ease", // Smooth transition
          }}
        >
          {/* Add onLoad event to ensure color is calculated after the image is loaded */}
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={img}
            alt={name}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="details">
          <div>
            <p>{name}</p>
          </div>
          <div>
            <h5 className="HomeSubTitle">{unit || " "}</h5>
          </div>
          <div className="priceDetails">
            <div>
              <span className="price">
                &#8377; {price.toLocaleString("en-IN")}
              </span>
            </div>
            
            {/* Display discount only if it's greater than 5% */}
            {discount !== null  && (
              <div className="discountBox">
                <div className="discountBoxInner">
                  <svg
                    viewBox="0 0 29 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"></path>
                  </svg>
                  <h4 className="discountText">
                    {discount}%
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
      <AddCartBtn
        ProIDSearch={ProIDSearch}
        img={img}
        name={name}
        price={price}
        mrp={mrp}
        unit={unit}
        category={category}
        discount={discount}
      />
    </div>
  );
}

export default HomeCard;
