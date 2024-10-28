import React from "react";
import { NavLink } from "react-router-dom";
import "./shop.css";

function ShopSideNav({ catArr , ActiveBtn}) {
  // Ensure catArr is not null/undefined and has at least one object with subcategories
  const subcategories = catArr && catArr.length > 0 && catArr[0].subcategories ? catArr[0].subcategories : [];

  return (
    <div className="sideNav lightGrayBorder">
      <nav className="navbar">
        <ul>
          {subcategories.length > 0 ? (
            subcategories.map((item, index) => (
              <li key={index} className={ActiveBtn === item ? "ActiveBtn" : ""} >
                <NavLink to={`?catid=${catArr[0].category}&subid=${item}`}>
                  <div className="sideBarImgSec">
                    <div className="bgImg"></div>
                  <img
                    src={require(`../../assets/images/sub_cat_images/${item}.png`)} 
                    alt={item}  
                  /></div>
                  {item.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) || "Unknown"}  
                </NavLink>
              </li>
            ))
          ) : (
            <li>No subcategories available</li>  
          )}
        </ul>
      </nav>
    </div>
  );
}

export default ShopSideNav;
