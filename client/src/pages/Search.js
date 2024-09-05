import React, { useState, useEffect , useContext} from "react";
import SearchBar from "../components/SearchBar";
import "../style/searchPage.css";
import Logo from "../components/Logo";
import OtherActionBtn from "../components/OtherActionBtn";
import HomeCard from "../components/HomeCard";
import "../style/home.css";
import "../style/shop.css";
import useFetchProducts from "../hooks/useFetchProducts";
import UserContext from "../context/UserContext";
function Search() {
  const { allProductData, loading, error } = useFetchProducts();
  const [filterProduct ,setFilterProduct] = useState([]);
  const { searchProduct } = useContext(UserContext); 
console.log(allProductData)
  useEffect(() => {
    const searchTerm = searchProduct || "";

    if (searchTerm) {
      const filtered = allProductData.filter((item) =>
        item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterProduct(filtered);
    } else {
      setFilterProduct(allProductData);
    }
  }, [searchProduct, allProductData]);

  return (
    <>
      <header className="searchPage">
        <Logo />
        <SearchBar />
        <OtherActionBtn />
      </header>
      <div className="shop-cards" style={{marginTop : "100px"}}>
        {filterProduct.map((item, index) => (
          <HomeCard
            key={item.pid}
            img={item.images[0]}
            name={item.title}
            mrp={item.mrp}
            price={item.price}
          />
        ))}
      </div>
    </>
  );
}

export default Search;
