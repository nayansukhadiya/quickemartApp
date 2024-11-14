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
    </div>
  );
}

export default HomeBanner;
