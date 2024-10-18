import React from "react";
import Banner from "../components/Banner";
import ProCategory from "../components/ProCategory";
import HomeBanner from "../components/HomeBanner";
import FilteredProductsPage from "./FilteredProductsPage";
import CartGenCard from "../components/CartGenCard";
function Home() {
  return (
    <div >
      <Banner />
     {/* <CartGenCard /> */}
      {/* <HomeBanner /> */}
      <ProCategory />
      <FilteredProductsPage subCategory={"chips"}/>
    </div>
  );
}

export default Home;
