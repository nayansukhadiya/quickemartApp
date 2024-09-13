import React from "react";
import Banner from "../components/Banner";
import ProductList from "../hooks/ProductList";
import ProCategory from "../components/ProCategory";
import BottomNav from "../components/BottomNav";
let category = ["vegetables","fruits","chips","milk","chocolates","noodle","fruitJuice","flour","softDrink","tea","syrup"]
function Home() {
  return (
    <div >
      <Banner />
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
