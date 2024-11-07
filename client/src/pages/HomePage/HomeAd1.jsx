import React from "react";
import { Link } from "react-router-dom";
import "./HomeBanner.css";

function HomeAd1() {
  let arr = [
    { name: 'parle', link: '/brand?name=Parle' },
    { name: 'cornitos', link: '/brand?name=Cornitos' },
    { name: 'nescafe', link: 'https://example.com/nescafe' },
    { name: 'bru', link: 'https://example.com/bru' },
    { name: 'doritos', link: 'https://example.com/doritos' },
    { name: 'crax', link: '/brand?name=Crax' },
    { name: 'lays', link: '/brand?name=Lay%27s' }
  ]
  return (
    <div className="HomeBannerSec">
      <div className="HomeBannerSection HomeBannerSection2 HomeGrid">
        {arr.map((item) => (
          <Link to={item.link} className="HomeBannerBoxMain HomeBannerSection2Div">
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

export default HomeAd1;
