import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import '../style/ProCategory.css'
import "../style/CategoryPage.css";
function ProCategory() {
  const [catArr, setCatArr] = useState([]);

  useEffect(() => {
    fetch("./data/category.json")
      .then((res) => res.json())
      .then((data) => {
        setCatArr(data);
      });
  }, []);
  return (
    <>
      <div className="categorySec">
        {catArr.map((item) => (
          <NavLink className="categoryCard" to={`/shop?catid=${item}`} key={item}>
            <img src={require(`../assets/category_img/n/${item}.png`)} alt="img"/>
            <p>
              {" "}
              {item
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
{/* <div className="headProCategory"><p>Category</p><Link to="/category">Sell all Category</Link></div> */}

export default ProCategory