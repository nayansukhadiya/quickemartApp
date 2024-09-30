import React from "react";
import Banner from "../components/Banner";
import ProductList from "../hooks/ProductList";
import ProCategory from "../components/ProCategory";
import HomeBanner from "../components/HomeBanner";
import AverageColor from '../components/AverageColor'
let category = ["vegetables","fruits","chips","milk","chocolates","noodle","flour","softDrink","tea","syrup"]
function Home() {
  return (
    <div >
      <Banner />
      <AverageColor />
      <img className="demoimg" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/ff6a2d4fc2dd5520d7d7967c72e4cf83"/>
      <HomeBanner />
      <ProCategory />
      <div className="FeaturesHome">
        {category.map((name)=> (
          <ProductList category={name}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
