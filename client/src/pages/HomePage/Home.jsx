import React from "react";
import Banner from "./Banner";
import ProCategory from "../../pages/CategoryPage/ProCategory";
import HomeBanner from "./HomeBanner";
import FilteredProductsPage from "./FilteredProductsPage";
import CartGenCard from "../../pages/CartGeneratorPage/CartGenCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import '../../style/index.css'
function Home() {
  return (
    <div className="homePage" >
      <div className="HomeSearch">
      <SearchBar />
      </div>
      <Banner />
     <CartGenCard />
      <HomeBanner />
      <ProCategory />
      <FilteredProductsPage subCategory={"chips"}/>
    </div>
  );
}

export default Home;
