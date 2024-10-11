import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";

function ProductNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    // Assuming your JSON file is structured as an array of categories.
    fetch("./data/category.json")
      .then((res) => res.json())
      .then((data) => {
        setNavData(data);
      });
  }, []);

  const visibleItems = navData.slice(0, 11); // First 11 items
  const moreItems = navData.slice(11); // Remaining items after 14

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="ProductNav">
        <nav className="navbar">
          <ul>
            {/* Render the visibleItems as the main navbar */}
            {visibleItems.map((item, index) => (
              <li key={index}>
                <NavLink to={`?catid=${item}`}>
                  {item.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </NavLink>
              </li>
            ))}

            {moreItems.length > 0 && (
              <li className="dropdownPro">
                <button className="dropList" onClick={toggleDropdown}>
                  More
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-list">
                    {moreItems.map((item, index) => (
                      <NavLink key={index} to={`?catid=${item}`}>
                        {item.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
    </div>
  );
}

export default ProductNav;
