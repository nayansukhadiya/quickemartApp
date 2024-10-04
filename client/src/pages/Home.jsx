import React from "react";
import Banner from "../components/Banner";
import ProductList from "../hooks/ProductList";
import ProCategory from "../components/ProCategory";
import HomeBanner from "../components/HomeBanner";
import AverageColor from '../components/AverageColor'
import FilteredProductsPage from "./FilteredProductsPage";
let category = ["vegetables"]
function Home() {
  return (
    <div >
      <Banner />
      <HomeBanner />
      <ProCategory />
      <FilteredProductsPage subCategory={"chips"}/>
      {/* <div className="FeaturesHome">
        {category.map((name)=> (
          <ProductList category={name}/>
        ))}
      </div> */}
    </div>
  );
}

export default Home;
