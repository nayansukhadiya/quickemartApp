import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../style/CategoryPage.css";

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
            <img src={require(`../assets/category_img/${item}.webp`)} />
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
