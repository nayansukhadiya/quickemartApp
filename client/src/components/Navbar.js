import React, { useEffect, useState } from 'react';
import "../style/navbar.css";
import SearchBar from "./SearchBar";
import '../style/searchPage.css'
import Logo from "./Logo";
import { useLocation } from 'react-router-dom';
import OtherActionBtn from "./OtherActionBtn";

function Navbar() {
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/chat" || currentPath === "/cart" || currentPath === "/account") {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [location]);
  
  return (
    <div className='headerCls'>
      <header>
        <div className="upperPart">
          <Logo />
          {!searchActive && <SearchBar />}
         <OtherActionBtn />
        </div>
      </header>
    </div>
  );
}

export default Navbar;
