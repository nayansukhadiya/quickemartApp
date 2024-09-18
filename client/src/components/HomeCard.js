import React from "react";
import { Link } from "react-router-dom";
import AddCartBtn from "./AddCartBtn";
function HomeCard({ img, name, mrp, price, ProIDSearch, subTitle, category }) {
  if (price === null || price === undefined) {
    return null;
  }
  const percentageDifference = (num1, num2) => {
    if (!num1 || !num2 || num1 === num2) {
      return null;
    }
    let percentageDiff = ((num2 - num1) / num2) * 100;
    return percentageDiff >= 5 ? Math.floor(percentageDiff) : null;
  };
  return (
    <div className="card">
      <Link title={name} to={`/detail?id=${ProIDSearch}`}>
        <div className="img-section">
          <img src={img} alt={name} />
        </div>
        <div className="details">
          <div>
            <p>{name}</p>
          </div>
          <div>
            <h5 className="HomeSubTitle">{subTitle || " "}</h5>
          </div>
          <div className="priceDetails">
            <div>
              <span className="price">
                &#8377; {price.toLocaleString("en-IN")}
              </span>
            </div>
            {percentageDifference(price, mrp) && (
              <div className="discountBox">
              <div className="discountBoxInner">
                <svg
                  viewBox="0 0 29 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
                  ></path>
                </svg>
                <h4 className="discountText">{percentageDifference(price, mrp)}% OFF</h4>
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
        subTitle={subTitle}
        category={category}
      />
    </div>
  );
}

export default HomeCard;
