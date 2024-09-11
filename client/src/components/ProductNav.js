import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";

const navItems = [
  { label: "Chips", linkName: "chips", path: "eat/lng" },
  { label: "Chocolates", linkName: "chocolates", path: "eat/0pt" },
  { label: "Biscuit, Cookie & Rusk", linkName: "biscuit", path: "eat/5am" },
  { label: "Fruit Juice", linkName: "fruitJuice", path: "eat/br4" },
  { label: "Noodle", linkName: "noodle", path: "eat/pqj" },
  { label: "Soft Drink", linkName: "softDrink", path: "eat/iw1" },
  { label: "Fruits", linkName: "fruits", path: "eat/w2q" },
  { label: "Vegetables", linkName: "vegetables", path: "eat/lmt" },
  { label: "Flour", linkName: "flour", path: "eat/e6o" },
  { label: "Milk", linkName: "milk", path: "eat/zn0" },
  { label: "Syrup", linkName: "syrup", path: "eat/vqg" },
  { label: "Tea", linkName: "tea", path: "eat/fpm" },
  { label: "Coffee", linkName: "coffee", path: "eat/dui" },
  { label: "Cheese", linkName: "cheese", path: "eat/uxm" },
  { label: "Paneer", linkName: "paneer" },
  { label: "Dairy Cream", linkName: "dairyCream" },
  { label: "Bread & Bun", linkName: "pavBun" },
  { label: "Spice Powder & Masala", linkName: "masala" },
  { label: "Chutneys", linkName: "chutneys" },
  { label: "Herb & Seasoning", linkName: "herb" },
  { label: "Paste & Puree", linkName: "paste" },
  { label: "Baking Ingredients", linkName: "baking" },
  { label: "Dry Fruit", linkName: "dryFruits" },
];

function ProductNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const visibleItems = navItems.slice(0, 14); // First 9 items
  const moreItems = navItems.slice(9); // Remaining items

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bottomPart">
      <div className="item-nav">
        <nav className="navbar">
          <ul>
            {visibleItems.map((item, index) => (
              <li key={index}>
                <NavLink to={`shop?id=${item.linkName}`}>{item.label}</NavLink>
              </li>
            ))}
            {moreItems.length > 0 && (
              <li className="dropdown">
                <button className="dropList" onClick={toggleDropdown}>
                  More
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-list">
                    {moreItems.map((item, index) => (
                      <NavLink key={index} to={`shop?id=${item.linkName}`}>
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductNav;
