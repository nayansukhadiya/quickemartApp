import React from "react";
import "../style/navbar.css";
import ProductNav from "./ProductNav";
import SearchBar from "./SearchBar";
import '../style/searchPage.css'
import Logo from "./Logo";
import OtherActionBtn from "./OtherActionBtn";
const navItems = [
  {
    label: "Home",
    path: "/",
    dropdown: [],
  },
  {
    label: "Shop",
    path: "/shop",
    dropdown: [],
  },
  {
    label: "Mobile",
    path: "shop/mobile",
    dropdown: [
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
    ],
  },
  {
    label: "TV",
    path: "/shop/tv",
    dropdown: [
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
    ],
  },
  {
    label: "laptop",
    path: "/shop/laptop",
    dropdown: [
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
    ],
  },
];

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
