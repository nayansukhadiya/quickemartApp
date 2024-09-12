import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from '../context/UserContext'
import "../style/shop.css";

function ShopSideNav() {
  const { navCat } = useContext(UserContext); // Accessing navCat from the context

  return (
      <div className="sideNav">
        <nav className="navbar">
          <ul>
            {navCat.map((item, index) => (
              <li key={index}>
                <NavLink to={`?id=${item.linkName}`}>
                  {/* Dynamically load the image based on the label */}
                  <img
                    src={require(`../assets/cat/cat_${item.linkName}.png`)}
                    alt={item.label}
                  />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
  );
}

export default ShopSideNav;
