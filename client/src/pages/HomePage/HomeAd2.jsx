import React from "react";
import { Link } from "react-router-dom";
import "./HomeBanner.css";

function HomeAd1() {
  let arr = [
    { name: "dawwat", link: "https://example.com/parle" },
    { name: "india", link: "https://example.com/cornitos" },
    { name: "supremeharvest", link: "https://example.com/nescafe" },
    { name: "zoff", link: "https://example.com/bru" },
    { name: "milkymist", link: "https://example.com/doritos" },
  ]
  return (
    <div className="HomeBannerSec">
      <div className="HomeBannerSection HomeGrid HomeBrand1">
        {arr.map((item) => (
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

export default HomeAd1;
