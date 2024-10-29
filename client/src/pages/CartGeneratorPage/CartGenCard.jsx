import React, { useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { Link } from "react-router-dom";
import "./cartGenCard.css";
import AddCartBtn from "../../components/AddCartBtn";

function CartGeneratorPageCard({
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
  const imgRef = useRef(null);
  const [isTransparent, setIsTransparent] = useState(false);

  const handleImageLoad = () => {
    const fac = new FastAverageColor();
    const imgElement = imgRef.current;

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

  return (
    <div className="CartGeneratorPageCard"> 
    <Link title={name} to={`/detail?id=${ProIDSearch}`}>
      <div
        className="imgSec"
        style={{
          backgroundColor: averageColor || "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        <img
          ref={imgRef}
          className={isTransparent ? "pngImg" : "jpgImg"}
          onLoad={handleImageLoad}
          crossOrigin="anonymous"
          src={img}
          alt={name}
        />
        <p className="CartGeneratorPageCardBrand">{brand || " "}</p>
      </div>
      <div className="detailCard">
        <h3 className="name">{name}</h3>
        <h3 className="unit">{unit}</h3>
        <div className="priceAndCart">
          <div className="CardGenCardPrice">
            &#8377; {price}{" "}
          </div>
        </div>
      </div></Link>
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

export default CartGeneratorPageCard;
