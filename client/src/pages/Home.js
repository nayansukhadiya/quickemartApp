import React from "react";
import Banner from "../components/Banner";
import ProductList from "../hooks/ProductList";
let category = ["vegetables","fruits","chips","milk","chocolates","noodle","fruitJuice","flour","softDrink","tea","syrup"]
function Home() {
  return (
    <div >
      <Banner />
      <div className="FeaturesHome">
        {category.map((name)=> (
          <ProductList category={name}/>
        ))}
      </div>
    </div>
  );
}

export default Home;
