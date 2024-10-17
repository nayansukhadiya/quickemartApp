import React from "react";
import Banner from "../components/Banner";
import ProCategory from "../components/ProCategory";
import HomeBanner from "../components/HomeBanner";
import FilteredProductsPage from "./FilteredProductsPage";
function Home() {
  return (
    <div >
      <Banner />
     
      <HomeBanner />
      <ProCategory />
      <FilteredProductsPage subCategory={"chips"}/>
    </div>
  );
}

export default Home;
