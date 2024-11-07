import React from "react";
import { Link } from "react-router-dom";
import "./HomeBanner.css";

function HomeBanner() {
  let mainArr = [
    { name: "fruit", link: "/shop?catid=fruits" },
    { name: "chocolate", link: "shop?catid=chocolates" },
    { name: "maggie", link: "/brand?name=Maggi" },
    { name: "tooMuch", link: "/brand?name=Maggi" },
  ];
  let arr2 = [
    { name: "dawwat", link: "https://example.com/parle" },
    { name: "india", link: "https://example.com/cornitos" },
    { name: "supremeharvest", link: "https://example.com/nescafe" },
    { name: "zoff", link: "https://example.com/bru" },
    { name: "milkymist", link: "https://example.com/doritos" },
  ];
  return (
    <div className="HomeBannerSec">
      <div className=" HomeBannerSection HomeBannerSectionMain HomeGrid">
        {mainArr.map((item) => (
          <Link to={item.link} className="HomeBannerBoxMain">
            <img
              src={require(`../../assets/images/banner/${item.name}.png`)}
              alt="img"
            />
          </Link>
        ))}
      </div>
      <div className="HomeBannerSection HomeGrid HomeBrand1">
        {arr2.map((item) => (
          <Link to={item.link} className="HomeBannerBox2">
            <img
              src={require(`../../assets/images/banner/focusBrand/${item.name}.png`)}
              alt="img"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeBanner;
