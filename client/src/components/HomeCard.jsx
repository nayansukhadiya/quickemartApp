import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AddCartBtn from "./AddCartBtn";
import { FastAverageColor } from "fast-average-color";

function HomeCard({
  img,
  name,
  mrp,
  price,
  ProIDSearch,
  category,
  discount,
  unit,
  brand,
}) {
  const [averageColor, setAverageColor] = useState(null);
  const [imgClass, setImgClass] = useState("pngImg"); // Default class is for PNG
  const [isTransparent, setIsTransparent] = useState(false);
  const imgRef = useRef(null);

  const handleImageLoad = () => {
    const fac = new FastAverageColor();
    const imgElement = imgRef.current;

    // Determine image format by its extension
    // const extension = img.split('.').pop().toLowerCase();
    // if (extension !== 'png') {
    //   setImgClass("jpgImg"); // If not PNG, set class to jpgImg
    // }

    if (imgElement) {
      fac
        .getColorAsync(imgElement)
        .then((color) => {
          const rgbaWithAlpha = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.2)`;
          setAverageColor(rgbaWithAlpha);
        })
        .catch((e) => {
          console.error(e);
        });

      // Create a canvas element to check for transparency
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      // Draw the image onto the canvas
      ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

      // Get the image data (including the alpha channel)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Check for any transparent pixels (alpha < 255)
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 255) {
          setIsTransparent(true);
          break;
        }
      }
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
            backgroundColor: averageColor || "transparent",
            transition: "background-color 0.3s ease",
          }}
        >
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={img}
            alt={name}
            onLoad={handleImageLoad}
            className={isTransparent ? "pngImg" : "jpgImg"} // Dynamic class based on transparency
          />
        </div>
        {discount !== null && (
          <div className="discountBox">
            <div className="discountBoxInner">
              <svg
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"></path>
              </svg>
              <h4 className="discountText">{discount}</h4>
            </div>
          </div>
        )}
        <div className="details">
          <div>
            <p>{name}</p>
          </div>
          <div>
            <h5 className="HomeSubTitle">{brand || " "}</h5>
          </div>
          <div>
            <h5 className="HomeSubTitle">{unit || " "}</h5>
          </div>
          <div className="priceDetails">
              <p className="price">
                &#8377; {price.toLocaleString("en-IN")}{" "}
              </p>
                <span className="mrp">
                  {mrp ? mrp.toLocaleString("en-IN") : ""}{" "}
                </span>
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
