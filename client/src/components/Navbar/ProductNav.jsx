import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

function ProductNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navData, setNavData] = useState([]);
  const [catNavId, setCatNavId] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const response = await fetch("./data/category.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNavData(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchNavData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catId = queryParams.get("catid");
    console.log("product navbar category is", catId);
    setCatNavId(catId);
  }, [location.search]);

  const visibleItems = navData.slice(0, 11);
  const moreItems = navData.slice(11);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (item) => {
    setCatNavId(item);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div className="ProductNav">
        <nav className="navbar">
          <ul>
            {visibleItems.map((item) => (
              <li
                key={item}
                className={catNavId === item ? "NavActiveBtn" : ""}
              >
                <NavLink to={`?catid=${item}`}>
                  {item
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </NavLink>
              </li>
            ))}

            {moreItems.length > 0 && (
              <li className="dropdownPro">
                <button
                  className="dropList"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                >
                  More
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-list">
                    {moreItems.map((item) => (
                      <NavLink
                        key={item}
                        to={`?catid=${item}`}
                        onClick={() => handleCategorySelect(item)}
                      >
                        {item
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="MobileShop">
        <Link to="/category">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Link>
        <p>
          {catNavId
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </p>
        <Link to="/search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </Link>
      </div>
    </>
  );
}

export default ProductNav;
