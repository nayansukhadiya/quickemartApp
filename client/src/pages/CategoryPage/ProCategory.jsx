import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import './ProCategory.css'
import "./CategoryPage.css";
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
            <img src={require(`../../assets/images/category_images/png/${item}.png`)} alt="img"/>
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

export default ProCategory