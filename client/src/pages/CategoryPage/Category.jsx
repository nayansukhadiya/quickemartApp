import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import "./CategoryPage.css";

function Category() {
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
          <NavLink className="categoryCard" to={`/shop?catid=${item}`}>
            <img src={require(`../../assets/images/category_images/n/${item}.png`)} alt="img" />
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

export default Category;
