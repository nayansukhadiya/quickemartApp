import React from "react";
import "../style/navbar.css";
import ProductNav from "./ProductNav";
import SearchBar from "./SearchBar";
import '../style/searchPage.css'
import Logo from "./Logo";
import OtherActionBtn from "./OtherActionBtn";

function Navbar() {
  return (
    <>
      <header>
        <div className="upperPart">
          <Logo />
          <SearchBar />
         <OtherActionBtn />
        </div>
       <div><ProductNav/></div>
      </header>
    </>
  );
}

export default Navbar;
