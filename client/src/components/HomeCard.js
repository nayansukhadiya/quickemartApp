import React from "react";
import { Link } from "react-router-dom"
import AddCartBtn from "./AddCartBtn";
import AddToFavBtn from "./AddToFavBtn";
function HomeCard({ img, name, mrp, price,ProIDSearch }) {
  if (price === null || price === undefined) {
    return null;
  }

  return (
    <div className="card">
      <AddToFavBtn />
    <Link  title={name} to={`/detail?id=${ProIDSearch}`}>
      <div className="img-section">
        <img src={img} alt={name} />
      </div>
      <div className="details">
        <div>
          <p>{name}</p>
        </div>
        <div className="priceDetails">
          <div>
            <span className="price">&#8377; {price.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </Link>
          <AddCartBtn/>
    </div>
  );
}

export default HomeCard;
