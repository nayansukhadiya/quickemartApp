import React from "react";
import { Link } from "react-router-dom";
import AddCartBtn from "./AddCartBtn";
function HomeCard({ img, name, mrp, price, ProIDSearch, subTitle, category }) {
  if (price === null || price === undefined) {
    return null;
  }

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
