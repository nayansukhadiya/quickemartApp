import React, { useEffect } from "react";
import Banner from "./Banner";
import ProCategory from "../../pages/CategoryPage/ProCategory";
import HomeBanner from "./HomeBanner";
import FilteredProductsPage from "./FilteredProductsPage";
import '../../style/index.css';
import HomeAd1 from "./HomeAd1";
import HomeAd2 from "./HomeAd2";
import Logo from '../../components/logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import UserLocation from '../../components/UserLocation/UserLocation'
function Home() {
  const arr = ["chips", "soft_drinks", "milk"];
  let scrolledPast400 = false;

  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      if (window.scrollY >= 400 && !scrolledPast400) {
        console.log("Scrolled 400px!");
        scrolledPast400 = true; // Prevents further logging until scrolled back
      } else if (window.scrollY < 400) {
        scrolledPast400 = false; // Reset when scrolling above 400px
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="homePage">
      <div className="LogoAndAddressSecHome">
        <Logo />
        <UserLocation />
      </div>
      <div className="HomeSearch">
        <SearchBar />
      </div>
      <Banner />
      <HomeBanner />
      <div className="TitleSec">
        <h3>Category</h3>
        <div className="LineFaded"></div>
      </div>
      <ProCategory />
      <div className="TitleSec">
        <h3>Trending Today</h3>
        <div className="LineFaded"></div>
      </div>
      <HomeAd1 />
      <div className="TitleSec">
        <h3>Brand Of the Day</h3>
        <div className="LineFaded"></div>
      </div>
      <HomeAd2 />
      {arr.map((item) => (
        <FilteredProductsPage key={item} subCategory={item} />
      ))}
    </div>
  );
}

export default Home;
