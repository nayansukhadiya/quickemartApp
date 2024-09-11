import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

function SearchBar() {
  const { setSearchProduct } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const location = useLocation();

  // Set the query state based on URL query parameters when on the search page
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get("q");
    if (q) {
      setQuery(q);
      setSearchProduct(q);
    }
  }, [location.search, setSearchProduct]);

  // Focus input when on the /search page
  useEffect(() => {
    if (location.pathname === "/search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.pathname]);

  // Handle input change: navigate or update URL query parameter
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchProduct(newQuery);

    if (location.pathname === "/search") {
      // Update query parameter in the URL without navigation
      navigate(`/search?q=${encodeURIComponent(newQuery)}`, { replace: true });
    } else {
      // Navigate to the search page
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Clear query and reset input field
  const handleCancel = () => {
    setQuery("");
    setSearchProduct("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (location.pathname === "/search") {
      // Update query parameter to clear search results
      navigate(`/search?q=`, { replace: true });
    }
  };

  return (
    <div className="searchBar ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.94em"
        height="1em"
        viewBox="0 0 15 16"
      >
        <path
          fill="currentColor"
          d="M6.5 13.02a5.5 5.5 0 0 1-3.89-1.61C1.57 10.37 1 8.99 1 7.52s.57-2.85 1.61-3.89c2.14-2.14 5.63-2.14 7.78 0C11.43 4.67 12 6.05 12 7.52s-.57 2.85-1.61 3.89a5.5 5.5 0 0 1-3.89 1.61m0-10c-1.15 0-2.3.44-3.18 1.32C2.47 5.19 2 6.32 2 7.52s.47 2.33 1.32 3.18a4.51 4.51 0 0 0 6.36 0C10.53 9.85 11 8.72 11 7.52s-.47-2.33-1.32-3.18A4.48 4.48 0 0 0 6.5 3.02"
        />
        <path
          fill="currentColor"
          d="M13.5 15a.47.47 0 0 1-.35-.15l-3.38-3.38c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.38 3.38c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
        />
      </svg>
      <input
        type="text"
        placeholder="What are you looking for?"
        onChange={handleInputChange}
        value={query}
        ref={inputRef}
      />
      <button onClick={handleSearch} className="searchButton">Search</button>
      {query && <div className="cancelBtn" onClick={handleCancel}>X</div>}
    </div>
  );
}

export default SearchBar;
