import React, { useEffect, useState } from 'react';
import "./navbar.css";
import SearchBar from '../SearchBar/SearchBar'
import Logo from '../logo/Logo'
import { useLocation } from 'react-router-dom';
import OtherActionBtn from "./OtherActionBtn";
import UserLocation from '../UserLocation/UserLocation';

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
          {searchActive && <SearchBar />}
          <UserLocation />
         <OtherActionBtn />
        </div>
      </header>
    </div>
  );
}

export default Navbar;
